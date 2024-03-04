import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { editUser } from '../store/user.actions'
import { userService } from '../services/user.service'
import { ImgUploader } from './ImgUploader'

import userIcon from '../assets/img/icons/user.svg'



export function Edit({ entity ,setEntity,setIsEdit,entityType}) {

  let initialCardentials
  if(entityType==='user')  initialCardentials = {name:entity.username , imgUrl:entity.imgUrl}
  if(entityType==='album')  initialCardentials ={name:entity.name , imgUrl:entity.imgUrl}

  const [credentials, setCredentials] = useState(initialCardentials)



  function handleChange({ target }) {
    const field = target.name
    const value = target.value

    setCredentials(prev => ({ ...prev, [field]: value }))
  }

  async function isEditEntity(e){
    e.preventDefault()

    if(entityType==='user') {
      
      let updatedUser=entity
      updatedUser.username = credentials.name,
      updatedUser.imgUrl = credentials.imgUrl
      try{
        updatedUser = await editUser(updatedUser)
        setEntity(updatedUser)
        setIsEdit(false)
    }
    catch(err){
        console.log(err)
    }

    }
    if(entityType==='album'){
      let updatedAlbum=entity
      updatedAlbum.name = credentials.name,
      updatedAlbum.imgUrl = credentials.imgUrl
      updatedAlbum.type = credentials.type
      try{
        updatedAlbum = await editAlbum(updatedAlbum)
        setEntity(updatedAlbum)
        setIsEdit(false)
    }
    catch(err){
        console.log(err)
    }
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
if(!credentials) return( <div>Loading...</div>)
  const { name, imgUrl ,type} = credentials
  
  return (
    <div id='modalBackdrop' className="modal-backdrop" >
      <div className='modal-background' onClick={closeModal}></div>
      <div className="modal-content">
        <form onSubmit={isEditEntity}>
          <h2>{(entityType==='user')? 'Edit your profile' : 'Album details'}</h2>
          <div className='details'>
          <ImgUploader imgUrl={imgUrl} onUploaded={onUploaded} />
          
          <input
            type="text"
            placeholder="Name"
            value={name}
            name='name'
            onChange={handleChange}
          />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}


