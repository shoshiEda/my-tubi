import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"


import { loadStations } from '../store/station.actions'

import albumCover from '../assets/img/pics/album-cover.jpeg'
import play from '../assets/img/icons/play.svg'





export function HomePage() {
    const stationTypes = useSelector(storeState => storeState.stationModule.stationTypes)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        loadStations()
    }, [])

    console.log(stationTypes, stations)

    return (
        <section>
            {stationTypes.map(type => {
                const filteredStations = stations.filter(station => station.type === type)
                return (
                    <div key={type}>
                        <h2>{type}</h2>
                        <div className='type-conteiner'>
                        {filteredStations.map(station => (
                             <Link to={'/station/' + station._id} className='station-card' key={station._id}>
                            <div  >
                                <img className='album-cover' src={station.imgUrl || albumCover} />
                                <button className="play-bg">
                                <img className="play-button" src={play } />
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
      