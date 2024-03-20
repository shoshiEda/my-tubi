import  Clock  from '../assets/img/icons/clock.svg'
import { SongPreview } from "./SongPreview.jsx";




export function Playlist({onSaveSong, songs, onRemoveSong, isEdit, id, user, onChangePlaylist,isSearch }) {

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
                    <SongPreview key={idx} idx={idx} song={song} isEdit={isEdit}
                        onRemoveSong={onRemoveSong} isSearch={isSearch} onChangePlaylist={onChangePlaylist}
                        user={user} id={id} onSaveSong={onSaveSong}>
                    </SongPreview>
                ))}

            </ul>
        </div >
    )
}