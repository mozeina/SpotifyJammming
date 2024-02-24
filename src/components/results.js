import React from 'react';
import '../styles/staticapp.css';
import '../styles/responsive.css';



function Results(props){

    return (
        <>
            {props.results.map((result, index) => {
                return (
                    <div className='resultsStyle' key={index} style={{display: 'flex'}}>
                        <img src={result.album.images[1].url} className='imgStyle' alt='album'/>
                        <div style={{marginTop: 30}}>
                            <p>{result.name}</p>
                            <p>{result.artists[0].name}</p>
                            <p>{result.album.name}</p>
                            <button className="button-68" onClick={() => props.onClick(result)} key={index}>Add To Playlist</button>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Results; 

