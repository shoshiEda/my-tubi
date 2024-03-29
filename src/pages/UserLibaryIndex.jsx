import React from 'react';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Edit} from '../cmps/Edit.jsx'
import { editUser } from "../store/user.actions.js"

import Delete from "../assets/img/icons/delete.svg"
import Plus from "../assets/img/icons/plus.svg"
import Search from "../assets/img/icons/search.svg"
import Library from "../assets/img/icons/library.svg"
import Sort from "../assets/img/icons/sort.svg"
import Dot from "../assets/img/icons/dot.svg"
import notes from '../assets/img/icons/notes.svg'


import LikedCover from '../assets/img/pics/liked-cover.png'


export function UserLibaryIndex() {
 
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterSort, setFilterSort] = useState({ txt: '', sortBy: '' })
    const [showSearch, setShowSearch] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userStations, setUserStations] = useState(user? [...user.stasions, ...user.likedStasions]: [])
    const [isEdit, setIsEdit] =useState(false)
    const [selectedIdx, setSelectedIdx] = useState(null);


   

    useEffect(() => {
        if (user) {
            FilterList()
            }
    }, [user]);


    useEffect(() => {
        if (user) {
        FilterList()
        }
    }, [filterSort.txt, filterSort.sortBy, user?.stasions, user?.likedStasions]);

    const handleClick = (idx) => {
        if (selectedIdx === idx) {
          setSelectedIdx(null);
        } else {
          setSelectedIdx(idx);
        }
      }

   

    async function onRemoveStation( station) {
        const type = station.createdBy===user.username? 'stasions' : 'likedStasions'
        try {           
            await editUser(user,type,station,false)
        }
        catch (err) { console.log(user.stasions) }

    }

    function setSort(value){
        setFilterSort(prev => ({ ...prev, sortBy: value }))
        FilterList()
    }

    function handleChange({ target }) {   
        setFilterSort(prev => ({ ...prev, txt: target.value }))
    }

    function submitFilter(ev){
        ev.preventDefault()
        console.log(filterSort)
        FilterList()
    }

    

    

    function FilterList() {
        const regex = new RegExp(filterSort.txt, 'i')
        let newList = [...user.stasions, ...user.likedStasions].filter(station => regex.test(station.name || station.createdBy));

         if (filterSort.sortBy === 'name') newList.sort((stationA, stationB) => stationA.name.localeCompare(stationB.name))
        else if (filterSort.sortBy === 'by') newList.sort((stationA, stationB) => stationA.createdBy.localeCompare(stationB.createdBy))
        else if (filterSort.sortBy === 'createdAt') newList.sort((stationA, stationB) => stationA.createdAt - stationB.createdAt)
        setUserStations(newList)

    }

    //if (!user ) return <div className='no-user-msg'>In order to save <br/> your own albums<br/> please log in</div>
    return (
    <div className="side-bar-main-content library-for-cell" >

            <section className="creation-and-toggle flex align-center justify-between">

                <p className="your-library flex align-center" >
                    <img className='svg library' src={Library} />
                    <span>Your Library</span>
                </p>
                <img className="plus-icon-left svg" src={Plus} onClick={()=>setIsEdit(true)} />
            </section>

            {isModalOpen && <section className='modal'>
                                <ul>
                                    <li onClick={()=>setSort('name')}>Sort by name</li>
                                    <li onClick={()=>setSort('by')}>Sort by creator</li>
                                    <li onClick={()=>setSort('createdAt')}>Sort by date</li>
                                    </ul></section>}

            <section className="search-sort-toggle-buttons flex align-center justify-between">
                        <div className="search flex align-center">
                        <button onClick={() => setShowSearch(!showSearch)} >
                            <img className='svg' src={Search} />
                        </button>
                        {showSearch &&
                         <form onInput={submitFilter}>
                           <input type="text" value={filterSort.txt} onChange={handleChange} />
                           </form>
                        }
                        </div>
                        <button className="sort" onClick={()=>setIsModalOpen(!isModalOpen)}>
                            <img className='svg' src={Sort} />
                        </button>
            </section>


            <section className="side-bar-content">

                <ul>
                    
                        <Link to={'/station/liked'}>
                        <li className={`left-side-albums flex align-center ${selectedIdx === 'liked' ? 'selected' : ''}`}>
                        <div className='pic-and-contant' onClick={() => handleClick('liked')}>
                            <img src={LikedCover}/>
                            <div className='album-info flex align-center column'>
                            <p>Songs you liked</p>
                            <p className='flex align-center'>Playlist  <img className='svg' src={Dot}/> {user.likedSongs? user.likedSongs.length : 0} songs</p>
                            </div>
                            </div>

                        </li>
                        </Link>
                        {userStations && userStations.map((station, idx) => (
                            <Link to={'/station/' + station._id} key={idx} >
                            <li  className={`left-side-albums flex ${selectedIdx === station._id ? 'selected' : ''}`}  >
                                
                                    <div className='pic-and-contant' onClick={() => handleClick(station._id)}>
                                    <img className={station.imgUrl ?'':'svg-icon'} src={station.imgUrl ? station.imgUrl:notes}></img> 
                                    <div className='album-info flex  column'>
  
                                        <p>{station.name}</p>
                                        <p className='flex align-center'>by:{station.createdBy}</p>
                                        </div>
                                        </div>
                                        
                                        <button onClick={(ev) => onRemoveStation(station)}><img className='svg delete' src={Delete}></img></button>
                                </li>
                                </Link>
                            
                                ))}
                </ul>
            </section>
            {isEdit && < Edit setIsEdit={setIsEdit} entityType={'station'}/>}

    </div >
)
}


