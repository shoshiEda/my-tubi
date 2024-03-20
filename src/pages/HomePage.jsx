import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export function HomePage() {

    const stationTypes = useSelector(storeState => storeState.stationModule.stationTypes)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    console.log(stationTypes,stations)

    return(
        stationTypes.map(type=>{
            <div>
        <h2>{type}</h2>
        </div>
    })
    )



   
}