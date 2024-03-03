import React from 'react';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
////import { removeStation, saveStation, setCurrStation, setUserStations } from "../../store/actions/station.actions"
//import { stationService } from "../../services/station.service"
//import { updateUser } from "../../store/actions/user.actions"
import { SortByModal } from "./SortModal.jsx"

import Delete from "../../assets/img/icons/delete.svg"
import Plus from "../../assets/img/icons/plus.svg"
import Search from "../../assets/img/icons/search.svg"
import Library from "../../assets/img/icons/library.svg"
import Sort from "../../assets/img/icons/sort.svg"


export function LeftSideBarLibrary() {

    const user = useSelector(storeState => storeState.userModule.user)
    // const currStation = useSelector((storeState) => storeState.stationsMoudle.currStation)

    const [filterSort, setFilterSort] = useState({ name: '', sortBy: '' })
    const [showSearch, setShowSearch] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [stationInFoucs, setStationInFoucs] = useState(null)
    const [userStations, setUserStations] = useState(null)


    const navigate = useNavigate()
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

    }

    async function onRemoveStation(ev, stationId) {

        ev.preventDefault()
        const newStations = user.stations.filter(station => station._id !== stationId)
        try {
            const editUser = { ...user, stations: newStations }
            await updateUser(editUser)
            await removeStation(stationId)
            navigate('/')
        }
        catch (err) { console.log(editUser.stations) }

    }

    function handleChange({ target }) {
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
    if (!user ) return <div>In order to save your own albums, please log in</div>


    return (

        <div className="side-bar-content" >

            <section className="creation-and-toggle flex">

                <p className="your-library flex" >
                    <img src={Library} />
                    <span>Your Library</span>
                </p>

                <div className="right-buttons flex">

                    {/*onClick={/*createStatio*/ }
                <img className="plus-icon-left" src={Plus} />

                </div>

            </section>

            <section className="side-bar-filtersort">
                <div className="search-sort-view">

                    <div className="search-sort-toggle-buttons flex">
                        <button onClick={() => setShowSearch(!showSearch)} >
                            <img src={Search} />
                        </button>
                        {showSearch &&
                           <input type="text" />
                        }
                        <button className="sort" /*onClick={openModal}*/>
                            <img src={Sort} />
                            {filterSort.sortBy}
                            {/*isModalOpen && <SortByModal setFilterSort={setFilterSort} isOpen={isModalOpen} onClose={closeModal} filterSort={filterSort}> </SortByModal>*/}
                        </button>
                    </div>

                </div>
            </section >

            <section className="side-bar-content">

                <ul>
                    {
                       /* userStations.map((station, idx) => (
                            <Link onClick={() => setStationInFoucs(station)} key={station._id} to={'/station/edit/' + station._id}>
                                <li className={`grid ${(stationInFoucs && stationInFoucs._id === station._id) ? 'active-class' : ''}`}>

                                    {station.imgUrl ?
                                        <img className="station-image-left-sidebar" src={station.imgUrl}></img> :
                                        <div className="svg-box">
                                            <Note></Note>
                                        </div>
                                    }
                                    <header>{station.name}</header>
                                    <p>
                                        <Pin></Pin>
                                        <span className="station-type">{station.type}</span>
                                        <span>{station.songs.length} songs</span>
                                        <button onClick={(ev) => onRemoveStation(ev, station._id)}><Delete></Delete></button>
                                    </p>

                                </li>
                            </Link>
                                ))*/}
                </ul>
            </section>
        </div >
    )
}


