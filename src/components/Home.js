// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Spotify Remix!</h1>
      <p>Discover remixes of songs in your Spotify playlists.</p>
      {/* <Link to="/authenticate">
        <button>Connect to Spotify</button>
      </Link> */}
    </div>
  );
};

export default Home;
