import React from 'react';

function Playlist(props){

    function handleNameChangeEvent(e){
        props.onNameChange(e.target.value);
    }
    return(
        <>
            <input style={{fontSize: "1.8rem", margin: 10, fontFamily: '"Montserrat", sans-serif', fontWeight: 700, width: '92%', backgroundColor: "rgba(255,255,255,.5)", overflowX: 'hidden'}} 
            onChange={handleNameChangeEvent} value={props.playlistName} id='playlistName'/>
            {props.playlist.map((track, index) => {
                return (
                    <div className='playlistStyle' key={index} style={{display: 'flex'}}>
                        <img src={track.album.images[0].url} className='imgStyle2' alt='album-image'/>
                        <div style={{marginTop: 30}} className='lineheight'>
                            <p>{track.name}</p>
                            <p>{track.artists[0].name}</p>
                            <p>{track.album.name}</p>
                            <button type='button' className="button-68" key={index} onClick={() => props.onRemove(track)}>Remove </button>
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default Playlist;


