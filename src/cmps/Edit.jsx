import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { editUser } from '../store/user.actions'
import { userService } from '../services/user.service'
import { ImgUploader } from './ImgUploader'

import userIcon from '../assets/img/icons/user.svg'



export function Edit({ entity ,setEntity,setIsEdit,entityType}) {

  const [credentials, setCredentials] = useState(null)

  if(entityType==='user') setCredentials({name:entity.username , imgUrl:entity.imgUrl})
  if(entityType==='album') setCredentials({name:entity.name , imgUrl:entity.imgUrl})




  function handleChange({ target }) {
    const field = target.name
    const value = target.value

    setCredentials(prev => ({ ...prev, [field]: value }))
  }

  async function isEditUser(e){
    e.preventDefault()
    let updatedUser={_id:user._id, username:credentials.username, imgUrl:credentials.imgUrl}
    try{
        updatedUser = await editUser(updatedUser)
        setUser(updatedUser)
        setIsEdit(false)
    }
    catch(err){
        console.log(err)
    }
  }


    function onUploaded(imgUrl) {
      setCredentials({ ...credentials, imgUrl })
  }

  function closeModal(e)
  {
    e.stopPropagation() 
    setIsEdit(false)
  }

  const { username, imgUrl } = credentials
  
  return (
    <div id='modalBackdrop' className="modal-backdrop" >
      <div className='modal-background' onClick={closeModal}></div>
      <div className="modal-content">
        <form onSubmit={isEditUser}>
          <h2>Edit your profile</h2>
          <p>Name:</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            name='username'
            onChange={handleChange}
          />
         <ImgUploader onUploaded={onUploaded} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}


