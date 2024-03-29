import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { setHeaderSearch } from '../store/system.actions'
import {useState } from "react"




import  homeIcon  from '../assets/img/icons/home.svg'
import  homeFullIcon  from '../assets/img/icons/home-full.svg'
import  searchIcon  from '../assets/img/icons/search.svg'
import  searchFullIcon  from '../assets/img/icons/search-full.svg'
import Library from "../assets/img/icons/library.svg"

export function BottomManu(){
    const isSearch = useSelector(storeState => storeState.systemModule.isSearch)
    let isActive = isSearch? 'Search' : 'Home'
    const [isLibrary, setIsLibrary] = useState(false);



    return(
    <section className="bottom-manu">  
     <ul className="clean-list flex aligh-center">

<li  >
    <Link to={"/"} style={{opacity: !isSearch && !isLibrary? '1' :'0.7'}}className={isActive} onClick={()=>{setHeaderSearch(false)
        setIsLibrary(false)}}>
    <img className='svg' src={!isSearch && !isLibrary? homeFullIcon : homeIcon } />
        <span>Home</span>
    </Link>
</li>

<li >
    <Link to={"/search"}  style={{opacity: isSearch? '1' :'0.7'}} className={isActive} onClick={()=>{setHeaderSearch(true)
    setIsLibrary(false)}}>
    <img className='svg' src={isSearch? searchFullIcon : searchIcon} />
        <span>Search</span>
    </Link>
</li>
<li >
    <Link to={"/mobile/libary"}  style={{opacity: isLibrary? '1' :'0.7'}}  onClick={()=>{setHeaderSearch(false)
    setIsLibrary(true)}}>
    <img className='svg' src={Library} />
        <span>Library</span>
    </Link>
</li>

</ul>  
        </section>)
}
