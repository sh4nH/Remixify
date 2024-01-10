import React from "react";
import { Link } from "react-router-dom";
import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT } from "../../config";

const RESPONSE_TYPE = "token";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-top-read",
];
const SCOPES_URL_PARAM = SCOPES.join("%20");

function Login() {
    const login = () => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES_URL_PARAM}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
    };

    return (
        <div>
            <h2>Login</h2>
            <button className="my-button" onClick={login}>Login to Spotify</button>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
}

export default Login;
