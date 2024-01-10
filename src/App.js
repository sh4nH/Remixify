
    import './App.css';
    import TopSongs from './components/topsongs/TopSongs';
    import Playlist from './components/playlist/Playlist';
    import Tracklist from './components/tracklist/Tracklist';
    import { useState, useEffect, useCallback } from 'react';


    function App() {
    //states
    const [tracklist, setTracklist] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [token, setToken] = useState("")
    const [user, setUser] = useState(null);
    


    useEffect(() => {
        // retrieves the current URL hash portion
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        } 
        setToken(token)

    }, [])
    
    // function to update tracklist, will be called by TopSongs.js after getting results
    const updateTracklist = (array) => {
        setTracklist(array);
    }

    const addToPlaylist = (newTrack) => {
        if (playlist.some((t) => t.id === newTrack.id)) {
        } else {
        setPlaylist((prev) => [...prev, newTrack]); // if not already in playlist, it will be added
        }
        
    };

    const removeFromPlaylist = (trackId) => {
        setPlaylist((prev) => prev.filter(n => n.id !== trackId));
    };

    const currentUser = async () => {
        try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
    
        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.reload(); 
            throw new Error('Network response was not ok');
        }
    
        const userData = await response.json();
        return userData; 

        } catch (error) {
        throw error; 
        }
    }

        const fetchCurrentUser  = useCallback(async () => {
        }, []); 


        useEffect(() => {
        const fetchUserData = async () => {
            try {
            const userData = await fetchCurrentUser ();
            setUser(userData);
            } catch (error) {
            console.error('Error fetching user data:', error);
            }
        };

        if (token) {
            fetchUserData();
        }
        }, [token, fetchCurrentUser]);
    
    
    const createPlaylist = async (userId, playlistName, token) => {
        try {
        let playlistId; 
    
        const createResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            name: playlistName,
            description: "New playlist created by app",
            public: false
            })
        });
    
        if (!createResponse.ok) {
            throw new Error('Error in createPlaylist. Network response was not ok');
        }
    
        const createJsonResponse = await createResponse.json();
        playlistId = createJsonResponse.id; 
    
        let uriArray = playlist.map(track => track.uri); 
    
        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            uris: uriArray, 
            position: 0,
            })
        });
    
        if (!addTracksResponse.ok) {
            throw new Error('Error in adding tracks to the playlist. Network response was not ok');
        }
    
        setPlaylist([]);
        setPlaylistName(''); 
    
        alert(`Your playlist ${playlistName} was successfully created!`); 
    
        return addTracksResponse.json();
        } catch (error) {
        alert("Error in playlist creation");
        }
    }

    const userProfileClickHandler = () => {
        localStorage.removeItem("token");
        window.location.reload();   
    }

    return (
        <div className="App" style={{minHeight: '100vh'}}>
        <div className="title">
        {user ? (
        <button onClick={userProfileClickHandler}><b>{user.name}</b></button>
      ) : (
        <button onClick={userProfileClickHandler}><b>Logout</b></button>
      )}
            <h1>TopTunes</h1>
            <div className='userInfo'>
            
            </div>
        </div>
        <TopSongs token={token} updateTracklist={updateTracklist} />
        {token ? (
            <div className='flex'>
            <Tracklist data={tracklist} addToPlaylist={addToPlaylist} />
            <Playlist
                className='flexItem'
                playlist={playlist}
                data={tracklist}
                removeFromPlaylist={removeFromPlaylist}
                setPlaylistName={setPlaylistName}
                playlistName={playlistName}
                currentUser={currentUser}
                createPlaylist={createPlaylist}
                token={token} />
            </div>
        )
            :
            ''
        }
        
        </div>
    );
    }

    export default App;
