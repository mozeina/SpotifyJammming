// //WORK IN PROGRESS...
// import { render, screen } from '@testing-library/react';
// import Playlist from './playlist';

// describe(Playlist, () => {
//     it('renders the right component', async () => {
//         const mockPlaylist = [
//             {
//                 name: 'song-1', 
//                 artists: [
//                     {
//                         name: 'artist1'
//                     }
//                 ],
//                 album: {
//                     name: 'album-name1',
//                     images: [
//                         {url: 'url1'},
//                         {url: 'url2'},
//                         {url: 'url3'}
//                     ]
//                 }
//             }, {
//                 name: 'song-2', 
//                 artists: [
//                     {
//                         name: 'artist2'
//                     }
//                 ],
//                 album: {
//                     name: 'album-name2',
//                     images: [
//                         {url: 'url1'},
//                         {url: 'url2'},
//                         {url: 'url3'}
//                     ]
//                 }
//             }
//         ];
//         const mockResults = [
//             {
//                 name: 'song-3', 
//                 artists: [
//                     {
//                         name: 'artist3'
//                     }
//                 ],
//                 album: {
//                     name: 'album-name3',
//                     images: [
//                         {url: 'url1'},
//                         {url: 'url2'},
//                         {url: 'url3'}
//                     ]
//                 }
//             },  {
//                 name: 'song-1', 
//                 artists: [
//                     {
//                         name: 'artist1'
//                     }
//                 ],
//                 album: {
//                     name: 'album-name1',
//                     images: [
//                         {url: 'url1'},
//                         {url: 'url2'},
//                         {url: 'url3'}
//                     ]
//                 }
//             }
//         ];

//         const onRemoveMock = jest.fn();
//         const onNameChangeMock = jest.fn();
//         const mockPlaylistName = 'U Wont Find Anything Better';


//         render(<Playlist  playlist={mockPlaylist} results={mockResults} onRemove={onRemoveMock} onNameChange={onNameChangeMock} playlistName={mockPlaylistName}/>);

//         mockPlaylist.forEach(track => {
//             expect(screen.getByText(track.name)).toBeInTheDocument();
//             expect(screen.getByText(track.artists[0].name)).toBeInTheDocument();
//             expect(screen.getByText(track.album.name)).toBeInTheDocument();
//             expect(screen.getByAltText('album-image')).toHaveAttribute('src', track.album.images[0].url);
//         })

//     })
// });
