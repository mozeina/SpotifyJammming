import React, { useEffect } from 'react';
import '../styles/staticapp.css';
import CopyButton from './copybutton';

function ExistingPlaylists(props) {
    // const [existingPlaylists, setExistingPlaylists] = useState([]);
    let src;
    
    function ViewExistingPlaylist(e){
        let clickedIndex = e.currentTarget.getAttribute('data-key');
        // console.log(clickedIndex);
        fetch(`https://api.spotify.com/v1/playlists/${props.existingPlaylists[clickedIndex].id}/tracks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${props.accessTokenState}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(!response.ok){
                console.log('something went wrong with displaying the playlist');
                return;
            }
            return response.json();
        }).then(data => {
            console.log('here is the tracks(is this an array?) ', data);
            let tracks = data.items.map(item => {
                return item.track;
            });
            props.setPlaylist(tracks);
            // console.log(props.existingPlaylists[e.currentTarget.getAttribute('data-key')]);
            // props.setPlaylistName(props.existingPlayists[e.currentTarget.getAttribute('data-key')].name);
            props.setPlaylistName(props.existingPlaylists[clickedIndex].name);
        });
    }
    
    // THIS MIGHT BE IMPORTANT LATER:
    // useEffect(() => {
    //     console.log(props.playlistName);
    // }, [props.playlistName]); 
    
    useEffect(() => {
        if(props.userID && props.accessTokenState){
           props.getMyPlaylists();
        }

    }, [props.userID, props.accessTokenState])

    return(
        <>
            <h2 style={{marginLeft: 20, marginTop: 20}}>Your Playlists</h2>

            {props.existingPlaylists.map((playlist, index) => {
                if(playlist.images.length > 0){
                    src = playlist.images[0].url;
                } else {
                    src = 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1';
                }
            return (
                <div className='existing flex' onClick={ViewExistingPlaylist} data-key={index} >
                    <img src={src} className='existingImg' alt='existing_playlist' />
                    <p>{playlist.name}</p>  
                    <CopyButton url={playlist.external_urls.spotify}/>    
                </div>
                );
            })}
        </>
    )
        
}
export default ExistingPlaylists;