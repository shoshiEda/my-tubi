import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { login, signup } from '../../store/user.actions'
import { userService } from '../../services/user.service'
import { ImgUploader } from '../ImgUploader'


export function SignIn({ setIsSighningIn }) {

  const [isSignup, setIsSignUp] = useState(false)
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
  //console.log("credentials:", credentials)


  function isLogin(ev) {
    ev.preventDefault()


    isSignup ? onSignup(credentials) : onLogin(credentials)
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.value

    setCredentials(prev => ({ ...prev, [field]: value }))

  }

  async function onLogin() {
    try {
      login(credentials)
      console.log('Logged in successfully')
    }
    catch (err) { console.log(err) }

  }

  async function onSignup(credentials) {
    try {
      signup(credentials)
      console.log('Signed in successfully')
    }
    catch (err) { console.log(err) }
  }

  useEffect(() => {

    return () => setIsSighningIn(false)}, [])


    function onUploaded(imgUrl) {
      setCredentials({ ...credentials, imgUrl })
  }

  function closeModal(e)
  {
    e.stopPropagation() 
    setIsSighningIn(false)
  }

  const { username, email, password } = credentials
  
  return (
    <div id='modalBackdrop' className="modal-backdrop" >
      <div className='modal-background' onClick={closeModal}></div>
      <div className="modal-content">
        <form onSubmit={isLogin}>
          <h2>{isSignup? 'SignUp':'Login'}</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            name='username'
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={password}
            onChange={handleChange}
          />
          {isSignup && <><input
            type="email"
            placeholder="Email"
            name='email'
            value={email}
            onChange={handleChange}
          />
          <ImgUploader onUploaded={onUploaded} />
          </>
          }
          <button type="submit">{(isSignup) ? ' Signup' : 'Sign in'}</button>
          <Link href="#" onClick={() => setIsSignUp(!isSignup)} >
            {isSignup ?
              'Already a member? Login' :
              "Don't have an account? Sign Up"
            }
          </Link>
        </form>
      </div>
    </div>
  )
}


