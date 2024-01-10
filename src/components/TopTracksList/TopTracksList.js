// TopTracksList.js
import React from "react";

const TopTracksList = ({ tracks }) => {
  return (
    <div>
      <h2>Top tracks</h2>
      {tracks.map(track => (
        <div key={track.id}>{track.name}</div>
      ))}
    </div>
  );
};

export default TopTracksList;
