import { useState } from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import { userService } from '../services/user.service'
import { Edit} from '../cmps/Edit.jsx'



import editIcon from '../assets/img/icons/edit.svg'
import userIcon from '../assets/img/icons/user.svg'


export function UserDetails(){
     const [user, setUser] = useState(userService.getLoggedinUser())
     const [isEdit, setIsEdit] =useState(false)
     const isComputer = useSelector(storeState => storeState.systemModule.isComputer)




    let loggedInUser={username: user.username,email:user.email, imgUrl:user.imgUrl}
    if (!user) return <h1>loadings....</h1>
    return user && 
    <div className='user-page'>
    <div className={'user-details' + (isComputer? '' : ' for-cell')}>
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
            <p>You have {user.stasions ? user.stasions.length : 0} {user.stasions.length === 1 ? ' album' : ' albums'}</p>
      </div>
      {isEdit && < Edit entity={user} setEntity={setUser} setIsEdit={setIsEdit} entityType={'user'}/>}
    </div>
    {  user.stasions &&<h2>Your albums:</h2>}
    {  user.stasions && <ul className=" stations-conteiner clean-list">
                    {
                        user.stasions.map(station =>
                                <Link to={'/station/' + station._id} className='station-card' key={station._id}>
                               <div  >
                                   <img className='album-cover' src={station.imgUrl || albumCover} />
                                   <p className='station-name'>{station.name}</p>
                                   <p className="description">{station.description}</p>
                               </div>
                               </Link>
                           )}
                </ul> }
    </div>






   
}