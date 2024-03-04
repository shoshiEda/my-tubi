import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import pictureIcon from '../assets/img/icons/picture.svg'

export function ImgUploader({ imgUrl=null ,onUploaded = null }) {
  const [imgData, setImgData] = useState(imgUrl)
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    console.log(ev)

    setIsUploading(true)
    const { secure_url} = await uploadService.uploadImg(ev)
    setImgData( secure_url)
    setIsUploading(false)
    console.log(secure_url)
    onUploaded && onUploaded(secure_url)
  }

  function getUploadLabel() {
    if (imgData) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  return (
    <div className="upload-preview">
      <p htmlFor="imgUpload">{getUploadLabel()}</p>
      
      <label className="img-container" htmlFor="imgUpload">
          <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" hidden/>
          {imgData ? 
            <img src={imgData} />
                :
            <img src={pictureIcon} className='imgUpload' alt="Upload Icon"/>}
      </label>      
  </div>
  )
}