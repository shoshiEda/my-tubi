import { useParams } from "react-router"
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { setCurrPlaying,setPlay } from '../store/system.actions'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { Loading } from '../cmps/Loading.jsx'


import albumCover from '../assets/img/pics/album-cover.jpeg'
import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'



import { loadStations } from '../store/station.actions'


export function StationsOfType(){

    const { type } = useParams()
    const currPlayingStation = useSelector(storeState => storeState.systemModule.currStation)
    const isPlay = useSelector(storeState => storeState.systemModule.isPlay) 
    const [isStationFirstTimePlaying, setsStationFirstTimePlayin] = useState(true)
    const [isStationPlaying, setIsStationPlaying] = useState(false)
    const [stations, setStations] = useState(null)
    useBackgroundFromImage()


    useEffect(() => {
        onLoadStations(type)
    }, [])

    async function onLoadStations(type){
        try{ 
            const newStations = await loadStations(type)
            setStations(newStations)  
        }
        catch (error) {console.log(error)}
    }

    async function onSetPlay(song,station=null){
        try{ 
            await setCurrPlaying(song,station)    
        }
        catch (error) {console.log(error)}
    }

    function setAlbumPlay(currStation){
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
    if (!stations) return <div><Loading/></div>
    return (
        <section>
            <h3>{type}</h3>
            <section className="stations-by-type">
            {stations.map((station =>
                             <Link to={'/station/' + station._id} className='station-card' key={station._id}>
                            <div  >
                                <img className='album-cover' src={station.imgUrl || albumCover} />
                                <button
                                onClick={(event) => {
                                    event.preventDefault()
                                    setAlbumPlay(station)
                                }} 
                                className="play-bg">
                                <img className="play-button" src={(currPlayingStation && (currPlayingStation._id===station._id) && isPlay)? pause : play } />
                                </button>
                                <p className='station-name'>{station.name}</p>
                                <p className="description">{station.description}</p>
                            </div>
                            </Link>))}
                            </section>
                     
        </section>
    )



}