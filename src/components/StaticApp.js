import React, {useState} from 'react';
import '../styles/staticapp.css';
import '../styles/responsive.css';
import Results from './results';
import Playlist from './playlist';



function StaticApp(props) {
    
    const [searchValue, setSearchValue] = useState('');
    // const [playlistID, setPlaylistID] = useState();
    const [playlistResponse, setPlaylistResponse] = useState('');
    
    function handleSearchChange(e){
        setSearchValue(e.target.value);
    }
    
    
    // we wanna change this into normal .thens()
    function handleSave() {
        let uriArray = props.playlist.map(track => track.uri);
        console.log(uriArray);
        props.clearPlaylist();
        let data = '';
        console.log(`this is the userID ${props.userID}`)
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
                fetch(`https://api.spotify.com/v1/playlists/${data}/tracks`, {
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
                                }).catch(err => {
                                    console.log('We got an error', err);
                                })
            }).catch(error => {
                console.log('we got an error', error);
            })
                
        }
    

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
                    <Playlist  playlist={props.playlist} results={props.results} onRemove={props.onRemove} onNameChange={props.onNameChange} playlistName={props.playlistname}/>
                    <div style={{textAlign: 'center'}}>
                        <button id='save' onClick={handleSave} >Save to Spotify</button>
                    </div>
                </div>
                <div className='track'>

                </div>
                <div className='tracklist'>

                </div>
            </main>
        </div> 
    );

}

export default StaticApp;