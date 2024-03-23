import { useParams } from "react-router"
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { setCurrPlaying } from '../store/system.actions'
import { editUser } from '../store/user.actions'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"


import albumCover from '../assets/img/pics/album-cover.jpeg'
import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'



import { loadStations } from '../store/station.actions'


export function StationsOfType(){

    const { type } = useParams()
    let stations = useSelector(storeState => storeState.stationModule.stations)
    const user = useSelector(storeState => storeState.userModule.user)
    const [isStationPlaying, setIsStationPlaying] = useState(false)
    useBackgroundFromImage()


    useEffect(() => {
        stations = loadStations(type)
    }, [])

    async function playStation(station){
        if(!station.songs || !station.songs.length) return
        setIsStationPlaying(!isStationPlaying)
        if(user){
            user.currSong=station.songs[0]
            user.currStation=station
        }   
        setCurrPlaying(station.songs[0],station)
        try{ 
            if(user)await editUser(user)     
        }
        catch (error) {console.log(error)}
    }

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
                                    playStation(station)
                                }} 
                                className="play-bg">
                                <img className="play-button" src={isStationPlaying? pause : play } />
                                </button>
                                <p className='station-name'>{station.name}</p>
                                <p className="description">{station.description}</p>
                            </div>
                            </Link>))}
                            </section>
                     
        </section>
    )



}