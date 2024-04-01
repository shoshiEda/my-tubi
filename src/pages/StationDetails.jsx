import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { loadStation } from "../store/station.actions"
import { Edit } from '../cmps/Edit.jsx'
import { Loading } from '../cmps/Loading.jsx'
import { Playlist } from "../cmps/Playlist"
import { SearchStation } from '../cmps/SearchStation.jsx'
import notes from '../assets/img/icons/notes.svg'
import dot from '../assets/img/icons/dot.svg'
import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'
import likedCover from '../assets/img/pics/liked-cover.png'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { editUser,setLikedSongs } from '../store/user.actions'
import { useNavigate } from "react-router-dom"
import { saveStation,setCurrStation,saveSongOnStation,removeSongOnStation } from '../store/station.actions'
import { setCurrPlaying,setPlay } from '../store/system.actions'
import { stationService } from '../services/station.service.js'
import { FullHeart } from '../services/icons.service.jsx'
import { Heart } from '../services/icons.service.jsx'





export function StationDetails() {
    const user = useSelector(storeState => storeState.userModule.user) || null
    const currStation = useSelector(storeState => storeState.stationModule.currStation) || null
    const currSong = useSelector(storeState => storeState.systemModule.currSong)
    const currPlayingStation = useSelector(storeState => storeState.systemModule.currStation)
    const isPlay = useSelector(storeState => storeState.systemModule.isPlay) 
    const isComputer = useSelector(storeState => storeState.systemModule.isComputer)

    const { id } = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const idx =  user? user.stations.findIndex(station => station._id === id) :-1
    const isUserStation = (idx===-1 && id!=='liked')? false:true
    const LikedIdx = (user && user.likedStations)? user.likedStations.findIndex(station => station._id===id) :0
    const isUserLikedAlbum = (!isUserStation && LikedIdx!==-1)? true : false
    const [openModal, setOpenModal] = useState({isOpen:false,idx:-1})
    const [isStationPlaying, setIsStationPlaying] = useState(false)
    const [isStationFirstTimePlaying, setsStationFirstTimePlayin] = useState(true)


    const navigate = useNavigate()



    useEffect(() => {
        onLoadStation()
    }, [id,user])

    useBackgroundFromImage(currStation?.imgUrl)

    async function onLoadStation() {
        if (id !== 'liked') {
            try {
                const station = await loadStation(id)
                setCurrStation(station)
            } catch (error) {
                console.error("Error loading station:", error)
            }
        } else {
            setCurrStation(setLikedStation())
        }
    }

    async function onSetPlay(song,station=null){
        try{ 
            await setCurrPlaying(song,station)    
        }
        catch (error) {console.log(error)}
    }


    function setLikedStation() {
        return {
            imgUrl: likedCover,
            name: 'Songs you liked',
            songs: user.likedSongs || [],
            _id:'liked'
        }
    }

    function culcDuration(){
        if(!currStation.songs) return ''
        return stationService.getStationDuration(currStation.songs)
    }

    async function setIsLiked(song,action){
        try{
            setLikedSongs(song,action)
        }
        catch (err) { console.log(err) }
    }


    async function  saveSongInAlbum(song,station){
        const updatedStation = { ...station }
        updatedStation.songs? updatedStation.songs.push(song) : updatedStation.songs=[(song)]
        try{
            await saveStation(updatedStation)
            setOpenModal({isOpen:false,idx:-1})
        }
        catch (err) { console.log(err) }
    }

    function setAlbumPlay(){
        if(!isStationFirstTimePlaying && currStation._id===currPlayingStation._id){
        setPlay(!isPlay)
        }
        else{
            setPlay(true)
            onSetPlay(currStation.songs[0],currStation)
            setsStationFirstTimePlayin(false)
        }
        setIsStationPlaying(!isStationPlaying)
    }

    function setSongPlay(song){
        if(currSong && currSong.trackId===song.trackId){
            setPlay(!isPlay)}
        else{
            setPlay(true)
            onSetPlay(song)
        }
    }

    async function setLikedAlbum(){
        if(!user) return 
        isUserLikedAlbum?       
        editUser(user,'likedStations',currStation,false)
        :
        editUser(user,'likedStations',currStation,true)
        navigate('/station/'+id)
    }

    

    async function onSaveSong(song){
        
        try{
             await saveSongOnStation(currStation,song)
        }
        catch (err) { console.log(err) }
    }

    async function onRemoveSong(deletadSong){
        if (id === 'liked') {
            try {        
                await setLikedSongs(deletadSong,false)
            } catch (error) {
                console.error("Error loading station:", error)
            }
        } else {
            
            try{
                await removeSongOnStation(currStation,deletadSong)
            }
         catch (error) {console.log(error)}
    }
}

async function onSetPlay(song,station=null){
    if(!currStation.songs || !currStation.songs.length) return
    try{ 
        await setCurrPlaying(song,station)    
    }
    catch (error) {console.log(error)}
}
  

    if (!currStation || !Object.keys(currStation).length || (currStation._id!==id)) return (isComputer? <div>Loading...</div> : <div><Loading/></div>)

    const { imgUrl, type, createdBy, name, songs, description } = currStation
    console.log(currStation)

    const amount = songs?.length || ''

    return (
        <section className={"station-details" + (isComputer? '' :' for-cell')}>
            <header className="station-header">
                <img src={imgUrl || notes} onClick={() => (isUserStation && id!=='liked')? setIsEdit(true):''} />
                <div className="station-header-info">
                    <h1 onClick={() => (isUserStation && id!=='liked')? setIsEdit(true):''}>{name}</h1>
                    <p className="description">{description}</p>
                    <br />
                    <p className="by">{id==='liked'? user.username : createdBy.username}</p>
                    {amount &&
                        <div>
                            <p>{amount} songs</p>
                            <img className='svg' src={dot} alt="dot" />
                            <p>duration: {culcDuration()}</p>
                        </div>}
                </div>
                <button onClick={setAlbumPlay}  className="play-bg">
                             <img className="play-button" src={isStationPlaying? pause : play } />
                        </button>
                 {!isUserStation &&<button className={"like-btn big big-heart animate__animated "
                                                +
                                            (isUserLikedAlbum && user? 'shown animate__heartBeat' : 'animate__shakeX')}
                                            onClick={setLikedAlbum}>
                                            {isUserLikedAlbum && user ? <FullHeart /> : <Heart />}
                                        </button>}
                    </header>

            <section className="station-details-control">
                <div className="station-details-control-left">
                </div>
            </section>
            <br />
            <hr />
            {songs && <Playlist id={id} songs={songs} onRemoveSong={onRemoveSong} isUserStation={isUserStation} openModal={openModal} setOpenModal={setOpenModal} setIsLiked={setIsLiked} setIsEdit={setIsEdit} saveSongInAlbum={saveSongInAlbum} setSongPlay={setSongPlay}></Playlist>}
            
            {id!=='liked' && isUserStation && <SearchStation currStation={currStation} setCurrStation={setCurrStation} onSaveSong={onSaveSong} />}
            {isEdit  && <Edit entity={currStation} setIsEdit={setIsEdit} entityType={'station'} />}
        </section>
    )
}