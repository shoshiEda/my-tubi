import { useEffect, useRef, useState } from "react"
import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'
import plus from '../assets/img/icons/plus.svg'
import trash from '../assets/img/icons/delete.svg'
import { useSelector } from "react-redux"
import { setContextMenu } from "../store/system.actions"



export function SongPreview({ song, idx, isEdit, onChangePlaylist, onRemoveSong, user, id, isSearch = false }) {

    //const activeContextMenuId = useSelector(storeState => storeState.appMoudle.playlistContextMenu)
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

    const contextMenuRef = useRef(null)
    

   

    function handleContextMenu(ev) {
        ev.preventDefault()

        const menuWidth = 160
        const menuHeight = 160

        let xPosition = ev.clientX
        let yPosition = ev.clientY

        if (xPosition + menuWidth > window.innerWidth) {
            xPosition = ev.clientX - menuWidth
        }

        if (yPosition + menuHeight > window.innerHeight) {
            yPosition = ev.clientY - menuHeight
        }

        setContextMenu(song.trackId)
        setContextMenuPosition({ x: xPosition, y: yPosition })
    }

    function handleClickOutside(ev) {
        if (contextMenuRef.current && !contextMenuRef.current.contains(ev.target)) {
            setContextMenu(null)
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <li key={idx} className="station-details-list"
            onContextMenu={handleContextMenu}
        >
            <div>
            <p className="idx">{idx + 1}</p>
            <img className="play svg" src={song.isPlaying? pause :play}/>
            </div>
            <div className="artist-and-image grid">  
                <div className="img-list-con">
                    <img src={song.imgUrl} /> 
                </div>{song.name}
                </div>
            <p >{song.artist}</p>
           
            <div className="durasion-and-icons">
            <img className="icon svg" src={plus}/>
            <p>{song.duration}</p>
            <img className="icon svg" src={trash} onClick={()=>onRemoveSong(song)}/>
            </div>
            {/*activeContextMenuId === song.trackId && (
                <ul ref={contextMenuRef} className="context-menu" style={{ position: 'absolute', top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}>
                    <li>
                        <select onChange={(ev) => {
                            setContextMenu(null)
                            onChangePlaylist(ev, song, id, isSearch)
                        }} className="playlist-select">
                            <option value="none">Pick Playlist</option>
                            {user.stations.map((station, idx) => (
                                station._id === id ?
                                    <option key={idx} value="same">Current Playlist</option> :
                                    <option key={idx} value={idx}>{station.name}</option>
                            ))}
                        </select>
                    </li>
                    {isEdit && <li onClick={(ev) => onRemoveSong(ev, song._id)}>Remove Song</li>}
                </ul>
                            )*/}
        </li>
    )
}