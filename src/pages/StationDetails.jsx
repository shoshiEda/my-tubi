import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { loadStation } from "../store/station.actions"
import { Edit } from '../cmps/Edit.jsx'
import { Playlist } from "../cmps/Playlist"
import { SearchStation } from '../cmps/SearchStation.jsx'
import notes from '../assets/img/icons/notes.svg'
import dot from '../assets/img/icons/dot.svg'
import likedCover from '../assets/img/pics/liked-cover.png'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { editUser } from '../store/user.actions'
import { useNavigate } from "react-router-dom"
import { saveStation } from '../store/station.actions'
import { stationService } from '../services/station.service.js'





export function StationDetails() {
    const user = useSelector(storeState => storeState.userModule.user)
    const { id } = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const [currStation, setCurrStation] = useState(null)

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

    async function onSaveSong(song){
        const updatedStation = { ...currStation }
        updatedStation.songs? updatedStation.songs.push(song) : updatedStation.songs=[(song)]
        setCurrStation(updatedStation)
        try{
            await saveStation(currStation)
            const idx = user.stasions.findIndex(station => station._id===currStation._id)
            user.stasions[idx]=currStation
            await editUser(user)
            navigate('/station/'+currStation.id)
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
    navigate('/station/'+id)
}
    

    if (!currStation || !user) return <div>...Loading</div>

    const { imgUrl, type, createdBy, name, songs, description } = currStation

    const amount = songs?.length || ''

    return (
        <section className="station-details">
            <header className="station-header">
                <img src={imgUrl || notes} onClick={() => setIsEdit(true)} />
                <div className="station-header-info">
                    <h1 onClick={() => setIsEdit(true)}>{name}</h1>
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
            </header>

            <section className="station-details-control">
                <div className="station-details-control-left">
                    {/*<PlayCard item={currStation}></PlayCard>
                    <LikeCard item={currStation}></LikeCard>*/}
                </div>
            </section>
            <br />
            <hr />
            {songs && <Playlist songs={songs} onRemoveSong={onRemoveSong}></Playlist>}
            
            {id!=='liked' && <SearchStation currStation={currStation} setCurrStation={setCurrStation} onSaveSong={onSaveSong} />}
            {isEdit && <Edit entity={currStation} setIsEdit={setIsEdit} entityType={'station'} />}
        </section>
    )
}