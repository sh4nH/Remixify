import React, { useEffect } from "react";
import "./Home.css";

const CLIENT_ID = "a8f0bd6bcf8b44fa9736810f3b9020f2"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com"
const REDIRECT_URL = "http://localhost:3000"

const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-modify-public",
    "playlist-modify-private"
]
const SCOPES_URL_PARAM = SCOPES.join("%20")

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1)
    const paramsInUrl = stringAfterHashtag.split("&")
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        const [key, value] = currentValue.split("=")
        accumulater[key] = value
        return accumulater
    }, {})
    return paramsSplitUp
}

const Home = () => {
    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash)
            localStorage.clear()
            localStorage.setItem("accessToken", access_token)
            localStorage.setItem("tokenType", token_type)
            localStorage.setItem("expiresIn", expires_in)
            window.location.hash = ""
        }
    }, [])
    const handleLogin   = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`

    }
    return (
        <div className="Home">
        <h1>How it works</h1>
        <p>T</p>
        <button onClick={handleLogin}>Login to Spotify</button>
        </div>
    );
};

export default Home;
