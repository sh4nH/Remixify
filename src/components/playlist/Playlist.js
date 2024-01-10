import styles from './Playlist.module.css';
import Track from '../track/Track';

const Playlist = ({ playlist, removeFromPlaylist, setPlaylistName, playlistName, userId, createPlaylist, token }) => {
  // click handler
  const clickHandler = async () => {
    try {
      await createPlaylist(userId, playlistName, token);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <div className={styles.playlist}>
      <form className={styles.form}>
        <input
          onChange={(e) => setPlaylistName(e.target.value)}
          value={playlistName}
          name='playlist'
          placeholder='Enter a name for your playlist'
        />
      </form>
      {playlist.map((song, index) => (
        <Track
          key={song.id}
          data={song}
          removeFromPlaylist={removeFromPlaylist}
          origin='playlist'
        />
      ))}
      <button type="submit" onClick={clickHandler}>
        Save to Spotify
      </button>
    </div>
  );
};

export default Playlist;
