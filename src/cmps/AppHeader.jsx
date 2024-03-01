import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useState} from 'react'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { Search } from './Search.jsx'


import  prevPage  from '../assets/img/icons/prev-page.svg'
import  nextPage  from '../assets/img/icons/next-page.svg'



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
        <header className="app-header">
                <div>
                    <button><img src={prevPage} alt="previous page" title="previous page"/></button>
                    <button><img src={nextPage} alt="next page" title="next page"/></button>
                </div>
                {isSearch && <Search/>}
                {user &&
                    <span className="user-icon">
                        <div onClick={openModal}>
                            {user.imgUrl? <img src={user.imgUrl} /> : user.fullname[0]}
                        </div>

                        <section className='modal'>
                        <Link to={`user/${user._id}`}></Link>
                        <button onClick={onLogout}>Logout</button>
                        </section>
                    </span>
                }
                {!user &&
                <button onClick={()=>setIsSighningIn(true)}>Register here</button>
                }
                {isSighningIn && <LoginSignup onLogin={onLogin} onSignup={onSignup} />}
        </header>
    )
}