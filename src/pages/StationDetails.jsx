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
import { editUser } from '../store/user.actions'
import { useNavigate } from "react-router-dom"
import { saveStation } from '../store/station.actions'
import { setCurrPlaying,setPlay } from '../store/system.actions'
import { stationService } from '../services/station.service.js'
import { FullHeart } from '../services/icons.service.jsx'
import { Heart } from '../services/icons.service.jsx'





export function StationDetails() {
    const user = useSelector(storeState => storeState.userModule.user) || null
    const currSong = useSelector(storeState => storeState.systemModule.currSong)
    const currPlayingStation = useSelector(storeState => storeState.systemModule.currStation)
    const isPlay = useSelector(storeState => storeState.systemModule.isPlay) 

    const { id } = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const [currStation, setCurrStation] = useState(null)
    const idx =  user? user.stasions.findIndex(station => station._id === id) :-1
    const isUserStation = (idx===-1 && id!=='liked')? false:true
    const LikedIdx = user? user.likedStasions.findIndex(station => station._id===id) :0
    const isUserLikedAlbum = (!isUserStation && LikedIdx!==-1)? true : false
    const [openModal, setOpenModal] = useState({isOpen:false,idx:-1})
    const [isStationPlaying, setIsStationPlaying] = useState(false)
    const [isStationFirstTimePlaying, setsStationFirstTimePlayin] = useState(true)





    const navigate = useNavigate()

    useEffect(() => {
        onLoadstation()
    }, [id])

    useBackgroundFromImage(currStation?.imgUrl)

    async function onLoadstation() {
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
            songs: user.likedSongs || []
        }
    }

    function culcDuration(){
        if(!currStation.songs) return ''
        return stationService.getStationDuration(currStation.songs)
    }

    async function setIsLiked(song,action){
        try{
            editUser(user,'likedSongs',song,action)
        }
        catch (err) { console.log(err) }
    }


    async function  saveSongInAlbum(song,station){
        const updatedStation = { ...station }
        updatedStation.songs? updatedStation.songs.push(song) : updatedStation.songs=[(song)]
        try{
            await saveStation(updatedStation)
            const idx = user.stasions.findIndex(station => station._id===updatedStation._id)
            if(idx!==-1)
            {
                user.stasions[idx]=updatedStation
                await editUser(user)
            }
            setOpenModal({isOpen:false,idx:-1})
            navigate('/station/'+id)
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
        editUser(user,'likedStasions',currStation,false)
        :
        editUser(user,'likedStasions',currStation,true)
        navigate('/station/'+id)
    }

    

    async function onSaveSong(song){
        
        const updatedStation = { ...currStation }
        updatedStation.songs? updatedStation.songs.push(song) : updatedStation.songs=[(song)]
        setCurrStation(updatedStation)
        console.log(currStation)
        try{
            await saveStation(currStation)
            const idx = user.stasions.findIndex(station => station._id===currStation._id)
            user.stasions[idx]=currStation
            await editUser(user)
            
        }
        catch (err) { console.log(err) }
    }

    async function onRemoveSong(deletadSong){
        if (id === 'liked') {
            try {        
                await editUser(user,'likedSongs',deletadSong,false)
            } catch (error) {
                console.error("Error loading station:", error)
            }
        } else {
            const idx = currStation.songs.findIndex(song=>song.trackId===deletadSong.trackId)
            currStation.songs.splice(idx,1)
            try{
                await saveStation(currStation)
                const stationIdx = user.stasions.findIndex(station => station._id===currStation._id)
                user.stasions[stationIdx]=currStation
                await editUser(user)
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
  

    if (!currStation) return <div><Loading/></div>

    const { imgUrl, type, createdBy, name, songs, description } = currStation

    const amount = songs?.length || ''

    return (
        <section className="station-details">
            <header className="station-header">
                <img src={imgUrl || notes} onClick={() => (isUserStation && id!=='liked')? setIsEdit(true):''} />
                <div className="station-header-info">
                    <h1 onClick={() => (isUserStation && id!=='liked')? setIsEdit(true):''}>{name}</h1>
                    <p className="description">{description}</p>
                    <br />
                    <p className="by">{createdBy}</p>
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