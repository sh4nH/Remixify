import { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT } from "./config";

function App() {
    const RESPONSE_TYPE = "token";
    const SCOPES = [
      "user-read-currently-playing",
      "user-read-playback-state",
      "playlist-read-private",
      "user-top-read",
    ];
    const SCOPES_URL_PARAM = SCOPES.join("%20");

    const [token, setToken] = useState("");
    const [tracks, settracks] = useState([]);

    useEffect(() => {
        const hash = window.location.hash;
        let storedToken = window.localStorage.getItem("token");

        if (!storedToken && hash) {
            storedToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", storedToken);
        }

        setToken(storedToken);
    }, []);

    const login = () => {
      window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES_URL_PARAM}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
    };

    const fetchTopTracks = async () => {
        try {
            const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            settracks(data.items);
        } catch (error) {
            console.error("Error fetching top tracks:", error);
        }
    };

    return (
        <div className="App">
            <h1>TopTunes</h1>
            <h2>Create a Spotify playlist with your top tracks!</h2>
            {!token ? (
                <button className="my-button" onClick={login}>Login to Spotify</button>
            ) : (
                <>
                    <button className="my-button" onClick={fetchTopTracks}>Show my Top 10 tracks</button>
                </>
            )}

            {token && tracks.length > 0 ? (
                <div>
                    <h2>Top tracks</h2>
                    {tracks.map(track => (
                        <div key={track.id}>
                            {track.name}
                        </div>
                    ))}
                </div>
            ) : (
                <h2> </h2>
            )}
        </div>
    );

}

export default App;
