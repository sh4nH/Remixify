import React, { useEffect, useState } from "react";
import axios from 'axios';

function TopTracks() {
    const [token, setToken] = useState("");
    const [Tracks, setTracks] = useState([]);

    useEffect(() => {
        const storedToken = window.localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const fetchTopTracks = async () => {
        try {
            const { data } = await axios.get('https://api.spotify.com/v1/me/top/Tracks?limit=10', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            setTracks(data.items);
        } catch (error) {
            console.error("Error fetching top Tracks:", error);
        }
    };

    return (
        <div>
            <h2>Top Tracks</h2>
            <button className="my-button" onClick={fetchTopTracks}>Fetch Top Tracks</button>

            {token && Tracks.length > 0 ? (
                <div>
                    {Tracks.map(track => (
                        <div key={track.id}>
                            {track.name}
                        </div>
                    ))}
                </div>
            ) : (
                <h2>Please fetch top Tracks</h2>
            )}
        </div>
    );
}

export default TopTracks;
