import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { loadStation ,getLikedStation } from "../store/station.actions"
import { Edit} from '../cmps/Edit.jsx'
import { SearchStation} from '../cmps/SearchStation.jsx'


import notes from '../assets/img/icons/notes.svg'
import dot from '../assets/img/icons/dot.svg'


//import { Playlist } from "../cmps/main/Playlist"
//import { LikeCard } from "../cmps/main/LikeCard"
//import { PlayCard } from "../cmps/main/PlayCard"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
//import { useDeviceCheck } from "../cmps/CustomHooks/UseDeviceCheck"



export function StationDetails() {

    const user = useSelector(storeState => storeState.userModule.user)
    const currStation = useSelector(storeState => storeState.stationModule.currStation)
    const params = useParams()
    const [isEdit, setIsEdit] =useState(false)

    console.log(params.id)

    useEffect(() => {
        console.log('useEffect:',params.id)
        onLoadstation()
    }, [params.id])

    useBackgroundFromImage(currStation ? currStation.imgUrl : null)
    //useDeviceCheck()

    async function onLoadstation() {
        console.log(params.id)

      if(params.id==='liked')
      {
        getLikedStation(user)
      }
      else{
        await loadStation(params.id)
      }
    }

    function setStation(){}

    console.log(currStation)


    if (!currStation) return <div>...Loading</div>

    const { imgUrl, type, createdBy, name, duration, songs, description } = currStation

    const amount = currStation.songs? currStation.songs.length : ''

    console.log('Render station-details')
    return (
        <section className="station-details" >
            <header className="station-header" >
            <img src={imgUrl ? imgUrl : notes} onClick={() => setIsEdit(true)} />                <div className="station-header-info">
                <h1 onClick={()=>setIsEdit(true)}>{name}</h1>
                <p className="description">{description}</p>
                < br/>
                <p className="by">{createdBy}</p>
                {amount&&<div >              
                     <p>{amount} songs</p>
                     <img src={dot}></img>                   
                     <p>duration: {duration}</p>
                </div>}
                </div>
            </header>

            <section className="station-details-control">
                <div className="station-details-control-left">
                    {/*<PlayCard item={currStation}></PlayCard>
                    <LikeCard item={currStation}></LikeCard>*/}

                </div>

            </section>
            < br/>
            < hr/>
            {/*<Playlist songs={songs}></Playlist>*/}
            <h3>Lets search for a new song</h3>
            <SearchStation />
            {isEdit && < Edit entity={currStation} setEntity={setStation} setIsEdit={setIsEdit} entityType={'station'}/>}

        </section >
    )

}






