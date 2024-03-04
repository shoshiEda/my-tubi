import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { userService } from '../services/user.service'
import { Edit} from '../cmps/Edit.jsx'



import editIcon from '../assets/img/icons/edit.svg'
import userIcon from '../assets/img/icons/user.svg'


export function UserDetails(){
     const [user, setUser] = useState(userService.getLoggedinUser())
     const [isEdit, setIsEdit] =useState(false)



    let loggedInUser={username: user.username,email:user.email, imgUrl:user.imgUrl}
    if (!user) return <h1>loadings....</h1>
    return user && <div className='user-details'>
      <div className="image-container">
        {loggedInUser.imgUrl ?
                <img className='user-img' src={user.imgUrl}></img>
                :
                <div className='user-icon-background'>
                    <img className='user-icon' src={userIcon}></img>
                </div>
        }
        <div className='edit-pic' onClick={()=>setIsEdit(true)}>
          <img className='edit-icon' src={editIcon}></img> 
          <p>choose a picture</p>
        </div>
      </div>
      <div className='user-info'>
            <p>Profile</p>
            <h3 onClick={()=>setIsEdit(true)}> {loggedInUser.username} </h3>
            <p>You have {user.station? user.station.length : 0} albums</p>
      </div>
      {isEdit && < Edit entity={user} setEntity={setUser} setIsEdit={setIsEdit} entityType={'user'}/>}
        {/*  <ul className="clean-list">
                    {
                        userStations.map(station =>
                            <Link key={station._id} to={'/1/station/edit/' + station._id}>
                                <li className="grid">
                                    <img className="station-image-left-sidebar" src={station.stationImgUrl}></img>
                                    <header>{station.name}</header>
                                    <p>
                                        <img src="\src\assets\img\pinned.svg" className="left-sidebar-pinned-icon"></img>

                                       
                                        <span className="station-type">{station.type}</span>
                                        <span>{station.songs.length} songs</span>
                                    </p>


                                   

                                </li>
                            </Link>
                        )
                    }
                </ul>*/ }
    </div>






   
}