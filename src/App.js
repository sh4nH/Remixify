// App.js
import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import LoginButton from "./components/LoginButton/LoginButton";
import TopTracksButton from "./components/TopTracksButton/TopTracksButton";
import TopTracksList from "./components/TopTracksList/TopTracksList";

function App() {


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
        <LoginButton />
      ) : (
        <>
          <TopTracksButton onClick={fetchTopTracks} />
        </>
      )}

      {token && tracks.length > 0 ? (
        <TopTracksList tracks={tracks} />
      ) : (
        <h2> </h2>
      )}
    </div>
  );
}

export default App;
