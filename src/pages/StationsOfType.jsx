import { useParams } from "react-router"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import albumCover from '../assets/img/pics/album-cover.jpeg'
import play from '../assets/img/icons/play.svg'



import { loadStations } from '../store/station.actions'


export function StationsOfType(){

    const { type } = useParams()
    let stations = useSelector(storeState => storeState.stationModule.stations)


    useEffect(() => {
        stations = loadStations(type)
    }, [])

    console.log(stations,type)

    return (
        <section>
            <h3>{type}</h3>
            <section className="stations-by-type">
            {stations.map((station =>
                             <Link to={'/station/' + station._id} className='station-card' key={station._id}>
                            <div  >
                                <img className='album-cover' src={station.imgUrl || albumCover} />
                                <button className="play-bg">
                                <img className="play-button" src={play } />
                                </button>
                                <p className='station-name'>{station.name}</p>
                                <p className="description">{station.description}</p>
                            </div>
                            </Link>))}
                            </section>
                     
        </section>
    )



}