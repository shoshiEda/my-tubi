import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useState} from 'react'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { Search } from './Search.jsx'


import  prevPage  from '../assets/img/icons/prevPage.svg'
import  nextPage  from '../assets/img/icons/nextPage.svg'



export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const isSearch = useSelector(storeState => storeState.systemModule.isSearch)
    const [isSighningIn,setIsSighningIn] =useState(false)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch(err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header flex justify-between">
                <div className='main-nav'>
                    <button><img src={prevPage} alt="previous page" title="previous page"/></button>
                    <button><img src={nextPage} alt="next page" title="next page"/></button>
                </div>
                {isSearch && <Search/>}
                <section className='user-acess'>
                    {user? (
                        <span className="user-nav">
                            <div onClick={openModal}>
                                {user.imgUrl? <img src={user.imgUrl} /> : user.fullname[0]}
                            </div>

                            <section className='modal'>
                            <Link to={`user/${user._id}`}></Link>
                            <button onClick={onLogout}>Logout</button>
                            </section>
                        </span>
                    ):(
                    <section className='no-user'>
                        <button onClick={()=>setIsSighningIn(true)}>Start listening</button>
                        {isSighningIn && <LoginSignup onLogin={onLogin} onSignup={onSignup} />}
                    </section>
                    )}
                    </section>

        </header>
    )
}