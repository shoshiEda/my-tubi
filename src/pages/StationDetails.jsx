import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { loadStation } from "../store/station.actions"
import { Edit } from '../cmps/Edit.jsx'
import { Playlist } from "../cmps/Playlist"
import { SearchStation } from '../cmps/SearchStation.jsx'
import notes from '../assets/img/icons/notes.svg'
import dot from '../assets/img/icons/dot.svg'
import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'
import heart from '../assets/img/icons/heart.svg'
import fullHeart from '../assets/img/icons/full-heart.svg'
import likedCover from '../assets/img/pics/liked-cover.png'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { editUser } from '../store/user.actions'
import { useNavigate } from "react-router-dom"
import { saveStation } from '../store/station.actions'
import { setCurrPlaying } from '../store/system.actions'
import { stationService } from '../services/station.service.js'





export function StationDetails() {
    const user = useSelector(storeState => storeState.userModule.user) || null
    const currSong = useSelector(storeState => storeState.systemModule.currSong)
    const { id } = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const [currStation, setCurrStation] = useState(null)
    const idx =  user? user.stasions.findIndex(station => station._id === id) :-1
    const isUserStation = (idx===-1 && id!=='liked')? false:true
    const LikedIdx = user? user.likedStasions.findIndex(station => station._id===id) :0
    const isUserLikedAlbum = (!isUserStation && LikedIdx!==-1)? true : false
    const [openModal, setOpenModal] = useState({isOpen:false,idx:-1})
    const [isStationPlaying, setIsStationPlaying] = useState(false)




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

    async function setIsLiked(song){

        let updatedSong=song
        updatedSong.isLiked=!song.isLiked
        const idx = currStation.songs.findIndex(oldSong=>oldSong._id===updatedSong._id)
        let updatedSongs=currStation.songs
        updatedSongs[idx]=updatedSong
        setCurrStation(prevStation => ({
            ...prevStation,
            songs: updatedSongs
        }))
        updatedSong.isLiked?       
          editUser(user,'likedSongs',updatedSong,false)
          :
          editUser(user,'likedSongs',updatedSong,true)
          navigate('/station/'+id)
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
            const newStation = await saveStation(currStation)
            console.log(newStation)
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
            console.log(idx,currStation.songs,deletadSong)
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

async function playStation(){
    if(!currStation.songs || !currStation.songs.length) return
    setIsStationPlaying(!isStationPlaying)
    if(user){
        user.currSong=currStation.songs[0]
        user.currStation=currStation
    }   
    setCurrPlaying(currStation.songs[0],currStation)
    try{ 
        if(user)await editUser(user)     
    }
    catch (error) {console.log(error)}
}

async function playSong(playSong){
    const idx = currStation.songs.findIndex(song=>song.trackId===playSong.trackId)
    setIsStationPlaying(false)
    
    if(currSong && currSong.trackId===playSong.trackId)
    {

    }
    else{
        currStation.songs.map(song=>song.isPlaying=false)
        if(user){
            user.currSong=playSong
            user.currStation=currStation
        }   
    }
    currStation.songs[idx].isPlaying=!currStation.songs[idx].isPlaying
    setCurrPlaying(playSong,currStation)
    try{ 
        if(user) await editUser(user)   
    }
    catch (error) {console.log(error)}
}

    

    if (!currStation) return <div>...Loading</div>

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
                <button onClick={playStation}  className="play-bg">
                             <img className="play-button" src={isStationPlaying? pause : play } />
                        </button>
                        {!isUserStation && <img onClick={setLikedAlbum} className="big-heart svg" src={isUserLikedAlbum && user? fullHeart:heart}/>}
            </header>

            <section className="station-details-control">
                <div className="station-details-control-left">
                </div>
            </section>
            <br />
            <hr />
            {songs && <Playlist id={id} songs={songs} onRemoveSong={onRemoveSong} isUserStation={isUserStation} openModal={openModal} setOpenModal={setOpenModal} setIsLiked={setIsLiked} setIsEdit={setIsEdit} saveSongInAlbum={saveSongInAlbum} playSong={playSong}></Playlist>}
            
            {id!=='liked' && isUserStation && <SearchStation currStation={currStation} setCurrStation={setCurrStation} onSaveSong={onSaveSong} />}
            {isEdit  && <Edit entity={currStation} setIsEdit={setIsEdit} entityType={'station'} />}
        </section>
    )
}