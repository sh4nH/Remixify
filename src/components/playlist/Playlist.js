import styles from "./Playlist.module.css";
import Track from "../track/Track";

const Playlist = ({
  playlist,
  removeFromPlaylist,
  setPlaylistName,
  playlistName,
  currentUser,
  createPlaylist,
  token,
}) => {
  const clickHandler = async () => {
    try {
      const userData = await currentUser(); 
      const userId = userData.id;
      await createPlaylist(userId, playlistName, token); 
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <div className={styles.playlist}>
      <h2>Create your playlist</h2>
      <form className={styles.form}>
        <input
          onChange={(e) => setPlaylistName(e.target.value)}
          value={playlistName}
          name="playlist"
          placeholder="Enter playlist name here"
        />
      </form>
      {playlist.map((song) => (
        <Track
          key={song.id}
          data={song}
          removeFromPlaylist={removeFromPlaylist}
          origin="playlist"
        />
      ))}
      <button type="submit" onClick={clickHandler}>
        Save playlist to Spotify
      </button>
    </div>
  );
};

export default Playlist;
