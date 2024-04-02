import { useEffect, useRef, useState } from "react"
import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'
import plus from '../assets/img/icons/plus.svg'
import trash from '../assets/img/icons/delete.svg'
import { FullHeart } from '../services/icons.service.jsx'
import { Heart } from '../services/icons.service.jsx'


import { useSelector } from "react-redux"



export function SongPreview({id,song,idx , onRemoveSong, isUserStation, openModal, setOpenModal, setIsLiked ,setIsEdit ,saveSongInAlbum ,setSongPlay }) {

    const user = useSelector(storeState => storeState.userModule.user)
    const currSong = useSelector(storeState => storeState.systemModule.currSong)
    const isPlay = useSelector(storeState => storeState.systemModule.isPlay) 

    const index = user? user.likedSongs.findIndex(Song=>Song.trackId===song.trackId) : -1
    const isSongLiked=index === -1 ? false : true
    

    return (
        <li key={idx} className="station-details-list"
        >
            <div>
                <p className="idx">{idx + 1}</p>
                <img onClick={()=>setSongPlay(song)} className="play svg" src={(currSong && currSong.trackId===song.trackId && isPlay) ? pause :play}/>
            </div>
            <div className="artist-and-image grid">  
                <div className="img-list-con">
                    <img src={song.imgUrl} /> 
                </div>{song.name}
                </div>
            <p >{song.artist}</p>
           
            <div className="durasion-and-icons">
            {user && id !== 'liked' && <button className={"like-btn small animate__animated "
                                            +
                                        (isSongLiked ? 'shown animate__heartBeat' : 'animate__shakeX')}
                                        onClick={()=>setIsLiked(song,!isSongLiked)}>
            
                                        {isSongLiked ? <FullHeart className='shown' /> : <Heart />}
                                    </button>}
            {user && id === 'liked' && <img onClick={()=>setOpenModal({isOpen:!openModal.isOpen,idx:idx})} className="icon svg" src={plus}/>}
            <p>{song.duration}</p>
            {isUserStation && <img className="icon svg" src={trash} onClick={()=>onRemoveSong(song)}/>}
            {user && !isUserStation && id !== 'liked' && <img onClick={()=>setOpenModal({isOpen:!openModal.isOpen,idx:idx})} className="icon svg" src={plus}/>}

            </div>
            {openModal.isOpen && openModal.idx===idx && <div  className='modal'><ul>
                                            <p onClick={()=>{
                                                setIsEdit(true) 
                                                setOpenModal({isOpen:false,idx:-1})}
                                                }>Add a new album</p>
                                            {user.stations && user.stations.map((station,idx)=> <li key={idx} onClick={()=>saveSongInAlbum(song,station)}>{station.name}</li>)}
                                            </ul></div>}
        </li>
    )
}