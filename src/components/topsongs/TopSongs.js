import styles from "./TopSongs.module.css";
import {
  CLIENT_ID,
  REDIRECT_URI,
  AUTH_ENDPOINT,
  RESPONSE_TYPE,
  SCOPE,
} from "../../config";

const TopSongs = ({ token, updateTracklist }) => {
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?limit=20`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        localStorage.removeItem("token");
        window.location.reload();
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const tracks = data.items;

      updateTracklist(tracks);
    } catch (error) {
      console.error("Error (TopSongs):", error);
    }
  };

  return (
    <div className={styles.TopSongs}>
      {!token ? (
        <button>
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`}
          >
            Login to Spotify
          </a>
        </button>
      ) : (
        <button onClick={submitHandler}>Show my Top 20 Songs</button>
      )}
    </div>
  );
};

export default TopSongs;
