import axios from 'axios';
import qs from 'qs';

// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = "http://localhost:3000/";
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
    console.log(window.location);
    return window.location.search
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            const parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
};

const query = qs.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join("%20"),
    response_type: 'code',
    show_dialog: true,
});

export const accessUrl = `${authEndpoint}?${query}`;

export const requestAccessAndRefreshTokens = async (code) => {
    try {
        const options = {
            method: 'POST',
            url: "https://accounts.spotify.com/api/token",
            headers: {
                'Authorization': 'Basic ' + new Buffer(`${clientId}:${clientSecret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
            }),
        };

        return axios(options);
    } catch (error) {
        console.error(error);
        return null;
    }
}
