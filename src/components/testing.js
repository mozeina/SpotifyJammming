const [playlistResponse, setPlaylistResponse] = useState('');
    

function handleSave(event) {
    // props.playlist

    let uriArray = (props.playlist.map(track => track.uri));
    console.log(uriArray);
    props.clearPlaylist();
    // console.log(uriArray);
    // return uriArray ;
    console.log(props.userID);
    let data = '';
    async function postPlaylist() { 
        try{
            console.log(playlistResponse);
            if (!playlistResponse){
                setPlaylistResponse(await fetch(`https://api.spotify.com/v1/users/${props.userID}/playlists`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${props.accessTokenState}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": props.playlistName,
                        "public": true
                    })
                    
                    }), () => {
                        async function test(){
                            console.log(playlistResponse);
                            if (!playlistResponse.ok){
                                console.log('something went wrong with the POST request response bro', playlistResponse);
                                return;
                            }
                            data = await playlistResponse.json();
                            console.log(data);
                            // setPlaylistID(data.id); 
                            // console.log(playlistResponse);
                            let tracksPostResponse = await fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${props.accessTokenState}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "uris": uriArray
                                })
                            })
                            if(!tracksPostResponse.ok){
                                console.log('response is not ok');
                                return;
                            }
                            let trackData = await tracksPostResponse.json();
                            console.log(trackData);   
                            }   
                        test();         
                    }  
                );        
            }
            
        }
        catch(error){
            console.log('something went wrong', error);
        }
    }
    postPlaylist();
}
// we wanna change this into normal .thens()
function handleSave2() {
    let uriArray = props.playlist.map(track => track.uri);
    console.log(uriArray);
    props.clearPlaylist();
    let data = '';
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
                            }).catch(err){
                                console.log('We got an error', err)
                            }
        }).catch(error){
            console.log('we got an error', error)
        }
    
}