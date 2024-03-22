import { utilService } from '../services/util.service'
import { apiService } from '../services/api.service'
import { Fragment, useEffect, useState } from 'react'
import { PlayCard } from '../cmps/main/PlayCard'
import { useNavigate, useParams } from "react-router"
import { useSelector } from 'react-redux'
//import { saveStation } from '../store/actions/station.actions'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { editUser } from '../store/user.actions'
import { Edit } from '../cmps/Edit.jsx'
import { saveStation } from '../store/station.actions'



import plus from '../assets/img/icons/plus.svg'
import  Heart  from '../assets/img/icons/heart.svg'
import  FullHeart  from '../assets/img/icons/full-heart.svg'
import  Pause  from '../assets/img/icons/pause.svg'
import  Play  from '../assets/img/icons/play.svg'






export function SearchPage() {

    const [searchList, setSearchList] = useState(null)
    const [openModal, setOpenModal] = useState({isOpen:false,idx:-1})
    const [isEdit, setIsEdit] = useState(false)

    const user = useSelector(storeState => storeState.userModule.user)

    const genres = ["New", 'Music', 'Pop', 'Hip-Hop', 'Rap', 'Latino', 'Indie', 'Rock', 'Podcusts', 'Live', 'Sport', 'Meditation', 'Party', 'Electronic', 'For sleep']

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        params.searchTerm ? fetchSearchResults() : setSearchList(null)
    }, [params.searchTerm])

    useBackgroundFromImage('')


    async function fetchSearchResults() {
        try {

            const searchList = await apiService.getContent(params.searchTerm)
            setSearchList(searchList)
        }
        catch (err) { console.log(err) }
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

    async function setIsPlaying(idx){
        const updatedSong = searchList[idx]
        updatedSong.isPlaying=!searchList[idx].isPlaying
        setSearchList(prevList => {
            const newList = [...prevList]
            newList[idx] = updatedSong; 
            return newList
          })   
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

   

     console.log(user.stasions,openModal)
     if(!searchList || !searchList.length)  return <h3>There are no results</h3>

    return (
        <section>
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
                        <button onClick={()=>setIsPlaying(0)} className="play-bg">
                             <img className="play-button" src={searchList[0].isPlaying ? Pause : Play } />
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
                                        <div className='song-image-play' onClick={(ev) => onPlayStation(ev)}>
                                            <img  src={song.imgUrl}></img>
                                            
                                                 <img onClick={()=>setIsPlaying(idx)} className="play-button" src={song.isPlaying ? Pause : Play } />
                                                
                                        </div>

                                        <div className='song-title-artist'>
                                            <p>{song.name}</p>
                                            {(song.artist !== 'Unknown') && <p>{song.artist}</p>}
                                        </div>
                                    </div>

                                    <div className='duration-add flex'>
                                    {user &&<button className="add-button" style={{ opacity: song.isLiked ? 1 : '' }}>
                                        <img onClick={()=>setIsLiked(idx,song.isLiked)} src={song.isLiked? FullHeart : Heart}/>
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