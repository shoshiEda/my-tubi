import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { editUser } from '../store/user.actions'
import { saveStation } from '../store/station.actions'
import { userService } from '../services/user.service'
import { ImgUploader } from './ImgUploader'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



import userIcon from '../assets/img/icons/user.svg'



export function Edit({ entity ={} ,setEntity,setIsEdit,entityType}) {

  let initialCardentials
  if(entityType==='user')  initialCardentials = {name:entity.username , imgUrl:entity.imgUrl}
  if(entityType==='station')  initialCardentials ={name:entity.name || '' , imgUrl:entity.imgUrl,description:entity.description || '',type:entity.type || ''}

  const [credentials, setCredentials] = useState(initialCardentials)
  const stationTypes = useSelector(storeState => storeState.stationModule.stationTypes)
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.user)




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
    if(entityType==='station'){
      let updatedAlbum=entity || {}
      updatedAlbum.name = credentials.name,
      updatedAlbum.imgUrl = credentials.imgUrl
      updatedAlbum.type = credentials.type || 'Mixed'
      updatedAlbum.description = credentials.description
      console.log(user)

      try{
        const newUpdatedAlbum = await saveStation(updatedAlbum)
        if(!updatedAlbum._id) await editUser(user,'stasions',newUpdatedAlbum,true)
        else{
          const idx = user.stasions.findIndex(station => station._id===newUpdatedAlbum._id)
          user.stasions[idx]=newUpdatedAlbum
          await editUser(user)
      }

        navigate(`/station/${newUpdatedAlbum._id}`)
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
  const { name, imgUrl ,type,description} = credentials
  
  
  return (
    <div id='modalBackdrop' className="modal-backdrop" >
      <div className='modal-background' onClick={closeModal}></div>
      <div className="modal-content">
        <form onSubmit={isEditEntity}>
          <h2>{(entityType==='user')? 'Edit your profile' : 'Album details'}</h2>
          <div className='details'>
          <ImgUploader imgUrl={imgUrl} onUploaded={onUploaded} />
          <section className='edit-details'>
          <input
            type="text"
            placeholder="Name"
            value={name}
            name='name'
            onChange={handleChange}
          />

        {(entityType==='station') && 
        <div>
        <label>type: </label> 
        <select
                    onChange={handleChange}
                    name="type"
                    value={type || 'Mixed'}>
                      {stationTypes.map(type=><option key={type} value={type}> {type} </option>)}
                </select></div>}

      {(entityType==='station') && 
      <textarea 
      className="text-area"
       name="description" 
       onChange={handleChange}
       value={description}
       placeholder="Description">
      </textarea>
      }
          </section>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}


