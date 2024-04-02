import { Link ,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useState} from 'react'
import { logout } from '../store/user.actions.js'
import { SignIn } from './user/SignIn.jsx'
import { Search } from './Search.jsx'


import  prevPage  from '../assets/img/icons/prevPage.svg'
import  nextPage  from '../assets/img/icons/nextPage.svg'



export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const isSearch = useSelector(storeState => storeState.systemModule.isSearch)
    const [isSighningIn,setIsSighningIn] =useState(false)
    const [isOpen,setIsOpen] =useState(false)

    const navigate = useNavigate()

    //console.log('render:',user)

    
    async function navigateTo(diff)
    {
        navigate(diff)
    }


    async function onLogout() {
        try {
            setIsOpen(false)
            const user = await logout()
            //navigate('/')
        } catch(err) {
            console.log('Cannot logout:',err)
        }
    }

   

    return (
        <header className="app-header flex justify-between">
                <div className='main-nav'>
                    <button><img onClick={()=>navigateTo(-1)} src={prevPage} alt="previous page" title="previous page"/></button>
                    <button><img onClick={()=>navigateTo(1)} src={nextPage} alt="next page" title="next page"/></button>
                </div>
                {isSearch && <Search/>}
                <section className='user-acess'>
                    {user? (
                        <span className="user-nav">
                            {user.imgUrl?
                                 <img  onClick={()=>setIsOpen(!isOpen)} className='prof-img' src={user.imgUrl} title={user.username}/> 
                                 : 
                                 <button className="user-pic" onClick={()=>setIsOpen(!isOpen)} title={user.username}>
                                    <span className="button-letter">{user.username.charAt(0)}</span> 
                                </button>}
                           

                            {isOpen && <section className='modal'>
                            <button onClick={()=>setIsOpen(false)}><Link to={`user/${user._id}`}><span>profile</span></Link></button>
                            <button onClick={onLogout}><span>Logout</span></button>
                            </section>}
                        </span>
                    ):(
                    <section className='no-user'>
                        <button onClick={()=>setIsSighningIn(true)}>Log in</button>
                        {isSighningIn && <SignIn setIsSighningIn={setIsSighningIn} />}
                    </section>
                    )}
                    </section>

        </header>
    )
}