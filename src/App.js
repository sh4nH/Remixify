import "./App.css";
import TopSongs from "./components/topsongs/TopSongs";
import Playlist from "./components/playlist/Playlist";
import Tracklist from "./components/tracklist/Tracklist";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function App() {
  // states
  const [tracklist, setTracklist] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const updateTracklist = (array) => {
    setTracklist(array);
  };

  const addToPlaylist = (newTrack) => {
    if (playlist.some((t) => t.id === newTrack.id)) {
    } else {
      setPlaylist((prev) => [...prev, newTrack]);
    }
  };

  const removeFromPlaylist = (trackId) => {
    setPlaylist((prev) => prev.filter((n) => n.id !== trackId));
  };

  const currentUser = async () => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        window.location.reload();
        throw new Error("Network response was not ok");
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  };

  // Function to create a playlist (assuming you have the user's ID)
  const createPlaylist = async (userId, playlistName, token) => {
    try {
      let playlistId;

      // Create the playlist
      const createResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
            description: "New playlist created by app",
            public: false,
          }),
        }
      );

      if (!createResponse.ok) {
        throw new Error("Error in createPlaylist. Network response was not ok");
      }

      const createJsonResponse = await createResponse.json();
      playlistId = createJsonResponse.id;

      let uriArray = playlist.map((track) => track.uri);

      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: uriArray,
            position: 0,
          }),
        }
      );

      if (!addTracksResponse.ok) {
        throw new Error(
          "Error in adding tracks to the playlist. Network response was not ok"
        );
      }

      setPlaylist([]);
      setPlaylistName("");

      alert(`Your playlist ${playlistName} was successfully created!`);

      return addTracksResponse.json();
    } catch (error) {
      throw error;
    }
  };

  const saveTrack = async (trackId) => {
    let curToken = token;
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${curToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: [trackId],
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error saving track");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <div className="title">
        <h2>TopTunes</h2>
        <h1>Create a playlist with your top songs on Spotify.</h1>
        <h3>
          Dive into your top 20 songs, curate a playlist that speaks to your
          soul.
        </h3>
      </div>
      <TopSongs token={token} updateTracklist={updateTracklist} />
      {token ? (
        <div className="flex">
          <div className="flexItem">
            <Tracklist
              data={tracklist}
              addToPlaylist={addToPlaylist}
              saveTrack={saveTrack}
            />
          </div>
          <Playlist
            className="flexItem"
            playlist={playlist}
            data={tracklist}
            removeFromPlaylist={removeFromPlaylist}
            setPlaylistName={setPlaylistName}
            playlistName={playlistName}
            currentUser={currentUser}
            createPlaylist={createPlaylist}
            token={token}
          />
        </div>
      ) : (
        ""
      )}
      <div style={{ marginTop: "220px" }}>
        <p>Created by Shan Hashir</p>
        <div className="logos-container">
          <a
            href="https://github.com/sh4nH/TopTunes"
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/shan-hashir/"
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
