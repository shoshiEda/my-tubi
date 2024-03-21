import  Clock  from '../assets/img/icons/clock.svg'
import { SongPreview } from "./SongPreview.jsx";




export function Playlist({id, songs, onRemoveSong, isUserStation , openModal, setOpenModal, setIsLiked , setIsEdit,saveSongInAlbum}) {

    return (

        <div>
            <ul className="song-list grid clean-list">
                <li className="list-header">
                    <p> #</p>
                    <p>Title</p>
                    <p>Artist</p>
                    <img className='svg clock' src={Clock} alt="clock" />
                </li>

            </ul>
            <ul className="song-list grid clean-list">
                {songs.map((song, idx) => (
                    <SongPreview key={idx} idx={idx} id={id} song={song} 
                        onRemoveSong={onRemoveSong} 
                        isUserStation={isUserStation} 
                        openModal={openModal}
                        setOpenModal={setOpenModal} 
                        setIsEdit={setIsEdit}
                        setIsLiked={setIsLiked}
                        saveSongInAlbum={saveSongInAlbum}>
                    </SongPreview>
                ))}

            </ul>
        </div >
    )
}