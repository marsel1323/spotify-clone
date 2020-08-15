import React, {useEffect} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import {useStateValue} from "./StateProvider";
import Player from "./Player";
import {getTokenFromResponse} from "./spotify";
import "./App.css";
import Login from "./Login";

const spotify = new SpotifyWebApi();

function App() {
    const [{token}, dispatch] = useStateValue();

    useEffect(() => {
        // Set token
        const hash = getTokenFromResponse();
        window.location.hash = "";
        let _token = hash.access_token;

        if (_token) {
            dispatch({
                type: "SET_SPOTIFY",
                spotify: spotify,
            });

            spotify.setAccessToken(_token);

            dispatch({
                type: "SET_TOKEN",
                token: _token,
            });

            spotify.getMe()
                .then((user) => {
                    dispatch({
                        type: "SET_USER",
                        user,
                    });
                });

            spotify.getUserPlaylists()
                .then((playlists) => {
                    dispatch({
                        type: "SET_PLAYLISTS",
                        playlists,
                    });
                });

            spotify.getPlaylist("7HUYJLFoNigH3QInjpjjEa")
                .then((response) =>
                    dispatch({
                        type: "SET_PLAYLIST",
                        discover_weekly: response,
                    })
                );

            spotify.getMyTopArtists()
                .then((response) =>
                    dispatch({
                        type: "SET_TOP_ARTISTS",
                        top_artists: response,
                    })
                );
        }
    }, [token, dispatch]);

    return (
        <div className="app">
            {!token && <Login/>}
            {token && <Player spotify={spotify}/>}
        </div>
    );
}

export default App;
