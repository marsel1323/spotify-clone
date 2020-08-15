import React, {useEffect} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import {useStateValue} from "./StateProvider";
import Player from "./components/Player";
import {
    getTokenFromResponse,
    requestAccessAndRefreshTokens,
} from "./utils/spotify";
import "./App.css";
import Login from "./components/Login";

const spotify = new SpotifyWebApi();

function App() {
    const [{accessToken}, dispatch] = useStateValue();

    useEffect(() => {
        // Set token
        const hash = getTokenFromResponse();
        // window.location.search = "";
        let {code} = hash;

        if (code) {
            requestAccessAndRefreshTokens(code)
                .then(response => {
                    dispatch({
                        type: "SET_TOKEN",
                        token: {
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                            expiresIn: response.data.expires_in,
                        },
                    });
                })
                .catch(error => {
                    console.error('requestAccessAndRefreshTokens', error);
                });

            spotify.setAccessToken(accessToken);

            spotify.getMe()
                .then((user) => {
                    console.log({user});
                    dispatch({
                        type: "SET_USER",
                        user,
                    });
                })
                .catch(error => {
                    console.error('getMe', error);
                })

            spotify.getUserPlaylists()
                .then((playlists) => {
                    dispatch({
                        type: "SET_PLAYLISTS",
                        playlists,
                    });
                })
                .catch(error => {
                    console.error('getUserPlaylists', error);
                })

            spotify.getPlaylist("7HUYJLFoNigH3QInjpjjEa")
                .then((response) =>
                    dispatch({
                        type: "SET_PLAYLIST",
                        playlist: response,
                    })
                )
                .catch(error => {
                    console.error('getPlaylist', error);
                })
        }
    }, [accessToken, dispatch]);

    return (
        <div className="app">
            {!accessToken && <Login/>}
            {accessToken && <Player spotify={spotify}/>}
        </div>
    );
}

export default App;
