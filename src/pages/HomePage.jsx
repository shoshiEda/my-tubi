import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"


import { loadStations } from '../store/station.actions'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { setCurrPlaying,setPlay } from '../store/system.actions'




import albumCover from '../assets/img/pics/album-cover.jpeg'
import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'





export function HomePage() {
    const stationTypes = useSelector(storeState => storeState.stationModule.stationTypes)
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const currPlayingStation = useSelector(storeState => storeState.systemModule.currStation)
    const isPlay = useSelector(storeState => storeState.systemModule.isPlay) 
    const [isStationFirstTimePlaying, setsStationFirstTimePlayin] = useState(true)


    useBackgroundFromImage()

    

    useEffect(() => {
        loadStations()
    }, [])


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

    return (
        <section>
            {stationTypes.map(type => {
                const filteredStations = stations.filter(station => station.type === type)
                return (
                    <div className='type-and-albums' key={type}>
                        <Link to={'/type/' + type}><h2>{type}</h2></Link>
                        <div className='type-conteiner'>
                        {filteredStations.map(station => (
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
                            </Link>
                        ))}
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
      