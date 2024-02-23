import React, {useState, useEffect} from 'react';
import '../styles/staticapp.css';
import '../styles/responsive.css';
import Results from './results';
import Playlist from './playlist';
import ExistingPlaylists from './existing';



function StaticApp(props) {
    
    const [searchValue, setSearchValue] = useState('');
    // const [playlistID, setPlaylistID] = useState();
    const [playlistResponse, setPlaylistResponse] = useState('');
    const [existingPlaylists, setExistingPlaylists] = useState([]);
    const [existingURIs, setExistingURIs] = useState([]);
    const [playlistURIs, setPlaylistURIs] = useState([]);
    const [uriArray, setURIArray] = useState([]);
    const [secondURIArray, setSecondURIArray] = useState([]);
    
    function handleSearchChange(e){
        setSearchValue(e.target.value);
    }
    function getMyPlaylists(){
        fetch(`https://api.spotify.com/v1/users/${props.userID}/playlists?limit=50`, {
                                        method: 'GET',
                                        headers: {
                                            'Authorization': `Bearer ${props.accessTokenState}`,
                                            'Content-Type': 'application/json'
                                        }
                                    }).then(response => {
                                        if(!response.ok){        
                                            console.log('response isn\'t ok');
                                            return;
                                        }
                                        return response.json();
                                    }).then(data => {
                                        console.log("Here's the Data thats failing", data);

                                        // let lol2 = data.items.filter(playlist => {
                                        //     return playlist.owner.id === props.userID;
                                        // });
                                        // setExistingPlaylists(lol2);
                                        setExistingPlaylists(data.items.filter(playlist => {
                                            return playlist.owner.id === props.userID;
                                         }));
                                        console.log('Existing playlists: ', existingPlaylists);
                                        

                                    }).catch(err => {
                                        console.log('an error has occured', err);
                                    });
    }
    
    function handleSave() {
    
        console.log(uriArray);
        
        let data = '';

        console.log(`this is the userID ${props.userID}`)
        //create the playlist
        if (!(existingPlaylists.map((playlist => playlist.name)).includes(props.playlistName))){
            setURIArray(props.playlist.map(track => track.uri));
            fetch(`https://api.spotify.com/v1/users/${props.userID}/playlists`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${props.accessTokenState}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": props.playlistName,
                    "public": true
                })
                }).then(response => {
                    if (!response.ok){
                        console.log('first fetch\'s response isn\'t ok');
                        return;
                    }
                    return response.json();
                }).then(objectData => {
                    data = objectData.id;
                    setPlaylistResponse(data);
                    // console.log('this is the playlist ID for the first if fetch', playlistResponse)
                    
                }).catch(error => {
                    console.log('we got an error', error);
            });
            
        } else  {
            // console.log('line 106', existingPlaylists.filter(playlist => playlist.name === props.playlistName)[0].tracks)
            fetch(existingPlaylists.filter(playlist => playlist.name === props.playlistName)[0].tracks.href, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${props.accessTokenState}`,
                    "Content-Type": 'application/json',
                }
            }).then(response => {
                if(!response.ok){
                    console.log('error on statticapp line 113');
                    return;
                } return response.json();     
            }).then(data => {
                console.log('here are the fetched tracks of the existing playlist selected', data);
                setExistingURIs(data.items.map(item => item.track.uri));    
                }).catch(err => {
                console.log(err)
            })
        }
    }   
    useEffect(() => {
        if (playlistResponse){
            fetch(`https://api.spotify.com/v1/playlists/${playlistResponse}/tracks`, {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${props.accessTokenState}`,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        "uris": uriArray
                                        })
                                    }).then(response => {
                                        if(!response.ok){
                                            console.log('yooo something wrong went with the second fetch response');
                                            return;
                                        } 
                                        return response.json();
        
                                    }).then(data => {
                                        console.log(data);
                                        getMyPlaylists();
                                    }).catch(err => {
                                        console.log('We got an error', err);
                                    })
                                props.clearPlaylist();
                                
        }
    }, [playlistResponse]) 
    
    useEffect(() => { 
        if (existingURIs.length > 0){
            setPlaylistURIs(props.playlist.map(track => track.uri));
        }
       
    }, [existingURIs]);

    useEffect(() => {
        if (playlistURIs.length > 0) {
            setSecondURIArray(playlistURIs.filter(uri => {
                return !(existingURIs.includes(uri));
            }));
        }
    }, [playlistURIs])

    useEffect(() => {
        if(playlistURIs.length > 0){
                    // console.log('line 144', existingPlaylists.filter(playlist => playlist.name === props.playlistName));
            fetch(`https://api.spotify.com/v1/playlists/${existingPlaylists.filter(playlist => playlist.name === props.playlistName)[0].id}/tracks`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${props.accessTokenState}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uris": secondURIArray
                    })
                }).then(response => {
                    if(!response.ok){
                        console.log('yooo something wrong went with the second fetch response line 138');
                        return;
                    } 
                    return response.json();

                }).then(data => {
                    console.log(data);
                    getMyPlaylists();
                }).catch(err => {
                    console.log('We got an error line 171', err);
                });
            props.clearPlaylist();
        }

       
        
    }, [secondURIArray]);
    
    

    function handleSearch(e){
        console.log(searchValue);       
        fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchValue)}&type=track`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${props.accessTokenState}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok){
                console.log('response is ok LETS GOOOO');
                return response.json();
            } else {
                throw new Error(`an Error has occured`);
            }    
        }).then(data => {
            console.log(data);
            props.setResults(data.tracks.items);
        }).catch(err => {
            console.log(err);
            console.log('we have been caught');
        });
        console.log(props.accessTokenState);

    };

    function handleKeyPress(e){
        if (e.key === 'Enter'){
            e.preventDefault();
            handleSearch();
        }
        
    }
    return(
        //here we should have the title and logo
        <div className='background'>
            <header>
                <h1 className='title'>Jammmify</h1>
            </header>
            <nav>
                <form className='searchForm' id='searchForm' >
                    <label htmlFor='searchbar'>Search For Song:</label>
                    <input type="search"  id='searchbar' key='search' value={searchValue} onChange={handleSearchChange} onKeyPress={handleKeyPress}/>
                    <button type='button' id='searchButton' onClick={handleSearch}>Search</button>
                </form>
            </nav>
            <main>
                <div className='searchResults' style={{overflowY: 'scroll'}}> 
                    <Results results={props.results} onClick={props.onClick}  />
                </div>
                <div className='playlist' style={{overflowY: 'scroll'}}>
                    <div style={{textAlign: 'center', paddingTop: 20}}>
                        <button id='save' onClick={handleSave} >Save to Spotify</button>
                    </div>
                    <Playlist  playlist={props.playlist} results={props.results} onRemove={props.onRemove} onNameChange={props.onNameChange} playlistName={props.playlistname}/>
                </div>
                <div className='track'>
                    <ExistingPlaylists userID={props.userID} accessTokenState={props.accessTokenState} existingPlaylists={existingPlaylists} 
                    getMyPlaylists={getMyPlaylists} setExistingPlaylists={setExistingPlaylists} setPlaylist={props.setPlaylist} setPlaylistName={props.setPlaylistName} 
                    playlistName={props.playlistName}/>
                </div>
                
            </main>
        </div> 
    );

}

export default StaticApp;