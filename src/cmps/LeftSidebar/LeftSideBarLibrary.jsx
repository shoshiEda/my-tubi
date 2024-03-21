import React from 'react';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Edit} from '../Edit.jsx'

////import { removeStation, saveStation, setCurrStation, setUserStations } from "../../store/actions/station.actions"
//import { stationService } from "../../services/station.service"
import { editUser } from "../../store/user.actions.js"
import { SortByModal } from "./SortModal.jsx"

import Delete from "../../assets/img/icons/delete.svg"
import Plus from "../../assets/img/icons/plus.svg"
import Search from "../../assets/img/icons/search.svg"
import Library from "../../assets/img/icons/library.svg"
import Sort from "../../assets/img/icons/sort.svg"
import Dot from "../../assets/img/icons/dot.svg"
import notes from '../../assets/img/icons/notes.svg'


import LikedCover from '../../assets/img/pics/liked-cover.png'


export function LeftSideBarLibrary() {

    const user = useSelector(storeState => storeState.userModule.user)
    // const currStation = useSelector((storeState) => storeState.stationsMoudle.currStation)

    const [filterSort, setFilterSort] = useState({ name: '', sortBy: '' })
    const [showSearch, setShowSearch] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [stationInFoucs, setStationInFoucs] = useState(null)
    const [userStations, setUserStations] = useState(null)
    const [isEdit, setIsEdit] =useState(false)

    console.log(user)

    const navigate = useNavigate()

    function setStation(){}
/*
    useEffect(() => {
        if (user) setUserStations(user.stations)

    }, [user])
        console.log("user:", user)

    function openModal() { setIsModalOpen(true) }
    function closeModal() { setIsModalOpen(false) }

    async function createStation() {
        let newStation = stationService.getEmptyStation('My station #', userStations.length - 1, '', { _id: user._id, username: user.username, })

        try {
            newStation = await saveStation(newStation)
            const newUserStations = userStations
            newUserStations.push(newStation)
            const editUser = { ...user, stations: newUserStations }
            await updateUser(editUser)
            navigate('/station/edit/' + newStation._id)
        }
        catch (err) { console.log(err) }

    }*/

    async function onRemoveStation( station) {
        try {           
            await editUser(user,'stasions',station,false)
            navigate('/')
        }
        catch (err) { console.log(user.stasions) }

    }

    /*function handleChange({ target }) {
        setFilterSort(prev => ({ ...prev, name: target.value }))
        FilterList()
        if (!target.value) setUserStations([...user.stations])
    }

    function FilterList() {
        const regex = new RegExp(filterSort.name, 'i')
        let newList = user.stations.filter(station => regex.test(station.name))
        if (filterSort.sortBy === 'name') newList.sort((stationA, stationB) => stationA.name.localeCompare(stationB.name))
        else if (filterSort.sortBy === 'createAt') newList.sort((stationA, stationB) => stationA.createdAt - stationB.createdAt)
        setUserStations(newList)

    }
*/
    if (!user ) return <div className='no-user-msg'>In order to save <br/> your own albums<br/> please log in</div>
console.log(user.stasions)

    return (

        <div className="side-bar-content" >

            <section className="creation-and-toggle flex align-center justify-between">

                <p className="your-library flex align-center" >
                    <img className='svg library' src={Library} />
                    <span>Your Library</span>
                </p>

                    {/*onClick={/*createStatio*/ }
                <img className="plus-icon-left svg" src={Plus} onClick={()=>setIsEdit(true)} />

            </section>

           

            <section className="search-sort-toggle-buttons flex align-center justify-between">
                        <div className="search flex align-center">
                        <button onClick={() => setShowSearch(!showSearch)} >
                            <img className='svg' src={Search} />
                        </button>
                        {showSearch &&
                           <input type="text" />
                        }
                        </div>
                        <button className="sort" /*onClick={openModal}*/>
                            <img className='svg' src={Sort} />
                            {filterSort.sortBy}
                            {/*isModalOpen && <SortByModal setFilterSort={setFilterSort} isOpen={isModalOpen} onClose={closeModal} filterSort={filterSort}> </SortByModal>*/}
                        </button>
            </section>


            <section className="side-bar-content">

                <ul>
                    
                        <Link to={'/station/liked'}>
                        <li className='left-side-albums flex align-center'>
                        <div className='pic-and-contant'>
                            <img src={LikedCover}/>
                            <div className='album-info flex align-center column'>
                            <p>Songs you liked</p>
                            <p className='flex align-center'>Playlist  <img className='svg' src={Dot}/> {user.likedSongs? user.likedSongs.length : 0} songs</p>
                            </div>
                            </div>

                        </li>
                        </Link>
                        {user.stasions && user.stasions.map((station, idx) => (
                            <li  className='left-side-albums flex ' key={idx}>
                            <Link to={'/station/' + station._id} >
                                
                                    <div className='pic-and-contant'>
                                    <img className={station.imgUrl ?'':'svg-icon'} src={station.imgUrl ? station.imgUrl:notes}></img> 
                                    <div className='album-info flex  column'>
  
                                        <p>{station.name}</p>
                                        <p className='flex align-center'>by:{station.createdBy} <img className='svg' src={Dot}/>{station.songs? station.songs.length:0} songs</p>
                                        </div>
                                        </div>
                                        </Link>
                                        <button onClick={(ev) => onRemoveStation(station)}><img className='svg delete' src={Delete}></img></button>
                                </li>
                            
                                ))}
                                 {user.likedStasions && user.likedStasions.map((station, idx) => (
                            <li  className='left-side-albums flex ' key={idx}>
                            <Link to={'/station/' + station._id} >
                                
                                    <div className='pic-and-contant'>
                                    <img className={station.imgUrl ?'':'svg-icon'} src={station.imgUrl ? station.imgUrl:notes}></img> 
                                    <div className='album-info flex  column'>
  
                                        <p>{station.name}</p>
                                        <p className='flex align-center'>by:{station.createdBy} <img className='svg' src={Dot}/>{station.songs? station.songs.length:0} songs</p>
                                        </div>
                                        </div>
                                        </Link>
                                        <button onClick={(ev) => onRemoveStation(station)}><img className='svg delete' src={Delete}></img></button>
                                </li>
                            
                                ))}
                </ul>
            </section>
            {isEdit && < Edit setEntity={setStation} setIsEdit={setIsEdit} entityType={'station'}/>}

        </div >
    )
}


