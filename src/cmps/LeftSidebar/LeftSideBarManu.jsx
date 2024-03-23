import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { setHeaderSearch } from '../../store/system.actions'



import  homeIcon  from '../../assets/img/icons/home.svg'
import  homeFullIcon  from '../../assets/img/icons/home-full.svg'
import  searchIcon  from '../../assets/img/icons/search.svg'
import  searchFullIcon  from '../../assets/img/icons/search-full.svg'


export function LeftSideBarManu(){

    const isSearch = useSelector(storeState => storeState.systemModule.isSearch)
    let isActive = isSearch? 'Search' : 'Home'


    return(<section className="left-sidebar-header">  
     <ul className="clean-list">

<li  >
    <Link to={"/"} style={{opacity: isSearch? '0.7' :'1'}}className={"flex align-center home " + isActive} onClick={()=>setHeaderSearch(false)} >
    <img className='svg' src={isSearch? homeIcon : homeFullIcon} />
        <span>Home</span>
    </Link>
</li>

<li >
    <Link to={"/search"}  style={{opacity: isSearch? '1' :'0.7'}} className={"flex align-center search " + isActive} onClick={()=>setHeaderSearch(true)}>
    <img className='svg' src={isSearch? searchFullIcon : searchIcon} />
        <span>Search</span>
    </Link>
</li>

</ul>  
        </section>)
}