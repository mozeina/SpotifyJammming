//WORK IN PROGRESS...
// import { render, screen} from '@testing-library/react';
// import Results from './results';


// describe(Results, () => {
//     it('returns array of songs in results', () => {
//         const mockSongs = [
//             {
//                 name: 'song-1', 
//                 artists: [
//                     {
//                         name: 'artist'
//                     }
//                 ],
//                 album: {
//                     name: 'album-name',
//                     images: [
//                         {url: 'url'},
//                         {url: 'url'},
//                         {url: 'url'}
//                     ]
//                 }
//             },   {
//                 name: 'song-1', 
//                 artists: [
//                     {
//                         name: 'artist'
//                     }
//                 ],
//                 album: {
//                     name: 'album-name',
//                     images: [
//                         {url: 'url'},
//                         {url: 'url'},
//                         {url: 'url'}
//                     ]
//                 }
//             }
//         ];
//         const onClickMock = jest.fn();
//         render(<Results results={mockSongs} onClick={onClickMock}/>);

//         mockSongs.forEach(song => {
//             expect(screen.getByText(song.name)).toBeInTheDocument();
//         })
//         // mockSongs.forEach(result => {
//         //     expect(screen.getByText(result.name)).toBeInTheDocument();
//         //     expect(screen.getByText(result.artists[0].name)).toBeInTheDocument();
//         //     expect(screen.getByText(result.album.name)).toBeInTheDocument();
//         //     expect(screen.getByAltText('album-image')).toHaveAttribute('src', result.album.images[1].url);
//         //     expect(screen.getByText('Add To Playlist')).toBeInTheDocument();
//         //     screen.getByText('Add To Playlist').click();
//         //     expect(onClickMock).toHaveBeenCalledWith(result);
//         // })
        
//     })
// })

