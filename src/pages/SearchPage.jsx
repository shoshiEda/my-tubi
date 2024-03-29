import { utilService } from '../services/util.service'
import { apiService } from '../services/api.service'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"
import { useSelector } from 'react-redux'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { editUser } from '../store/user.actions'
import { Edit } from '../cmps/Edit.jsx'
import { saveStation } from '../store/station.actions'
import { setCurrPlaying,setPlay } from '../store/system.actions'
import { FullHeart } from '../services/icons.service.jsx'
import { Heart } from '../services/icons.service.jsx'






import plus from '../assets/img/icons/plus.svg'
import  Pause  from '../assets/img/icons/pause.svg'
import  Play  from '../assets/img/icons/play.svg'






export function SearchPage() {

    const [searchList, setSearchList] = useState(null)
    const [openModal, setOpenModal] = useState({isOpen:false,idx:-1})
    const [isEdit, setIsEdit] = useState(false)
    const [isStationPlaying, setIsStationPlaying] = useState(false)

    

    const user = useSelector(storeState => storeState.userModule.user)
    const currSong = useSelector(storeState => storeState.systemModule.currSong)
    const currStation = useSelector(storeState => storeState.systemModule.currStation)
    const isPlay = useSelector(storeState => storeState.systemModule.isPlay) 
    const isComputer = useSelector(storeState => storeState.systemModule.isComputer)



    const genres = ["New", 'Music', 'Pop', 'Hip-Hop', 'Rap', 'Latino', 'Indie', 'Rock', 'Podcusts', 'Live', 'Sport', 'Meditation', 'Party', 'Electronic', 'For sleep']

    const params = useParams()
    const navigate = useNavigate()

    

    useEffect(() => {
        params.searchTerm ? fetchSearchResults() : setSearchList(null)
    }, [params.searchTerm])

    useBackgroundFromImage('')

    function isSongLiked(song){
        const index = user.likedSongs.findIndex(Song=>Song.trackId===song.trackId)
        console.log(index)
        return index === -1 ? false : true
    }


    async function fetchSearchResults() {
        try {

            const searchList = await apiService.getContent(params.searchTerm)
            setSearchList(searchList)
        }
        catch (err) { console.log(err) }
    }

    async function onSetPlay(song,station=null){
        try{ 
            await setCurrPlaying(song,station)    
        }
        catch (error) {console.log(error)}
    }


    async function setIsLiked(idx,isLiked){
        const updatedSong = searchList[idx]
        updatedSong.isLiked=!searchList[idx].isLiked
        setSearchList(prevList => {
            const newList = [...prevList]
            newList[idx] = updatedSong; 
            return newList
          }) 
          isLiked?       
          editUser(user,'likedSongs',updatedSong,false)
          :
          editUser(user,'likedSongs',updatedSong,true)
    }

    function setAlbumPlay(){
        if(currStation && currStation._id===params.searchTerm){
        setPlay(!isPlay)
        }
        else{
            setPlay(true)
            onSetPlay(searchList[0],{_id:params.searchTerm,name:params.searchTerm,songs:searchList})
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


    async function saveSongInAlbum(currStation,song){
        const updatedStation = { ...currStation }
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
            navigate('/search/'+params.searchTerm)
        }
        catch (err) { console.log(err) }
    }

   
     if(searchList && !searchList.length)  return <h3>There are no results</h3>

    return (
        <section className={isComputer? '' :' for-cell'}>
            {!params.searchTerm &&
                <Fragment>
                    <h1 className='browse-all'>Browse all</h1>
                    <ul className="ganeres-list">
                        {genres.map(ganere =>
                            <li key={ganere} style={{ backgroundColor: utilService.getRandomColor() }} onClick={() => navigate('/search/' + ganere)}>
                                {ganere}<img src={`src/assets/img/pics/${ganere}.jpeg`}></img></li>
                        )}
                    </ul>
                </Fragment>
            }
            {searchList &&

                <div className='search-hero grid'>
                    <div>
                        <h2 className="section-title">Top result</h2>
                    </div>
                    <div className='top-result-section'>
                        <div className='image-container'>
                            <img className='top-result-image' src={searchList[0].imgUrl}></img>
                        </div>
                        <div className='details-container'>
                            <h3>{params.searchTerm}</h3>
                        </div>
                        <button className="play-bg">
                             <img onClick={setAlbumPlay} className="play-button" src={isStationPlaying ? Pause : Play } />
                        </button>
                    </div>

                    <div>
                        <h2 className="section-title">Songs</h2>
                    </div>
                    <div className='results-section'>
                        <ul className='search-result-list clean-list'>
                            {searchList.map((song,idx) =><div key={idx} style = {{display:"none"}}>{idx}{song.name}</div>)}
                            {searchList.map((song,idx) =>
                                <li className='single-song-result grid' key={idx}>
                                    <div className='img-play-title-artist-container grid'>
                                        <div className='song-image-play'>
                                            <img  src={song.imgUrl}></img>
                                            
                                            <img onClick={()=>setSongPlay(song)} className="play-button" src={(currSong && currSong.trackId===song.trackId && isPlay) ? Pause : Play } />
                                                
                                        </div>

                                        <div className='song-title-artist'>
                                            <p>{song.name}</p>
                                            {(song.artist !== 'Unknown') && <p>{song.artist}</p>}
                                        </div>
                                    </div>
                                    
                                    <div className='duration-add flex'>

                                    {user &&<button className={"like-btn small animate__animated "
                                            +
                                        (isSongLiked(song) ? 'shown animate__heartBeat' : 'animate__shakeX')}
                                        onClick={()=>setIsLiked(idx,song.isLiked)}>
                                        {isSongLiked(song) ? <FullHeart /> : <Heart />}
                                    </button>}
                                        <p>{song.duration}</p>
                                        {user && <button className='add-button' onClick={() => setOpenModal({isOpen:!openModal.isOpen,idx:idx})}><img className='plus' src={plus} /></button>}
                                    </div>
                                    
                                        {openModal.isOpen && openModal.idx===idx && <div  className='modal'><ul>
                                            <p onClick={()=>{
                                                setIsEdit(true) 
                                                setOpenModal({isOpen:false,idx:-1})}
                                                }>Add a new album</p>
                                            {user.stasions && user.stasions.map((station,idx)=> <li key={idx} onClick={()=>saveSongInAlbum(station,song)}>{station.name}</li>)}
                                            </ul></div>}
                                            
                                </li>
)}
                        </ul>
                    </div>

                </div>
            }
            {isEdit && <Edit  setIsEdit={setIsEdit} entityType={'station'} />}

            {(!searchList && params.searchTerm) && <div>...loading</div>}
        </section >)

}