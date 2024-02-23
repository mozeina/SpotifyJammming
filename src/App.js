
import './App.css';
import StaticApp from './components/StaticApp'; 
import React, {useState, useEffect} from 'react';


function App() {

  const [results, setResults] = useState([
    // {
    //   songName: 'Heart Attack',
    //   artist: 'Demi Lovato',
    //   album: 'Demi',
    //   uri: 'uri-link3'
  
    // }, {
    //   songName: "Best Day Ever",
    //   artist: 'Mac Miller',
    //   album: 'BDE (5th Anniversary Remastered)', 
    //   uri: 'uri-link4'
    // }
  ]);

  const [playlist, setPlaylist] = useState([

    ]);
  
  const [playlistName, setPlaylistName] = useState('');

  function handleAddToPlaylist(song){
      if (!playlist.includes(song)){
          setPlaylist(prev => [...prev, song]);
      }
      };

  function handleRemoveFromPlaylist(song){
      setPlaylist(prev => [...prev.filter(track => track !== song)])
      };
      
  function clearPlaylist() {
    setPlaylist([]);
  }

  function handlePlaylistNameChange(value){
    setPlaylistName(value)
  }

  //Authorization

  function generateRandomString(length){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    let randomString = '';
    for(let i = 0; i < length; i++){
      let randomIndex = Math.floor(Math.random() * chars.length)
      randomString += chars[randomIndex];
    }
    return randomString; 
  };
 

  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = urlParams.get('access_token');
  const expiresIn = parseInt(urlParams.get('expires_in'));
  const expiryTime = Date.now() + expiresIn * 1000;
  
  
  const [accessTokenState, setAccessTokenState] = useState();
  const [userID, setUserID] = useState();
  
  useEffect(() => {
    
    
      function isExpired() {
        return Date.now() > expiryTime;
      } 

    if (!accessToken || isExpired()) {
      const state = generateRandomString(16);
      const client_id = 'b66d5aa0b11d44239a138cf284c7a568'; // Your Spotify Client ID
      const redirect_uri = 'http://localhost:3000/'; // Your redirect URI
      const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative'; // The scopes you need
      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += `&state=${encodeURIComponent(state)}`;

      // Redirect only if there's no access token in the URL
      window.location.href = url; 

    } else {
      setAccessTokenState(accessToken);
      async function awaitID() {
      try{
        let response = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok){
          console.log('respose isnt ok big man');
          return;
        }
        let userObject = await response.json();
        console.log(userObject)
        setUserID(userObject.id);
        console.log(userID);
        } catch(error) {
        console.log(`an error has occured: ${error}`)
        }
      }
      awaitID();
    }
    const urlWithoutParams = window.location.pathname;
    window.history.replaceState({}, document.title, urlWithoutParams);
    // console.log(accessToken, expiresIn);  

    
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount

  // fetch(url, {
  //   method: 'GET',
  
  // })
  // .then(resolvedValue => {
  //   console.log('Request successful');
  // })
  // .catch(rejectedValue => {
  //   console.error('Error occurred:', rejectedValue);
  // });
  
  //End Of Authorization
  
 
  return (
    <StaticApp results={results} playlist={playlist} onClick={handleAddToPlaylist} onRemove={handleRemoveFromPlaylist} 
    onNameChange={handlePlaylistNameChange} playlistName={playlistName} clearPlaylist={clearPlaylist}
     setPlaylistName={setPlaylistName} accessToken={accessToken} setResults={setResults} accessTokenState={accessTokenState} userID={userID} setPlaylist={setPlaylist} />
  );
}
export default App;