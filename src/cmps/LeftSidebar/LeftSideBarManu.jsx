import { Link } from 'react-router-dom'
import {setHeaderSearch} from '../../store/system.actions.js'
import {useSelector} from 'react-redux'


import  homeIcon  from '../../assets/img/icons/home.svg'
import  homeFullIcon  from '../../assets/img/icons/home-full.svg'
import  searchIcon  from '../../assets/img/icons/search.svg'
import  searchFullIcon  from '../../assets/img/icons/search-full.svg'


export function LeftSideBarManu(){

    const isSearch = useSelector(storeState => storeState.systemModule.isSearch)



    return(<section className="left-sidebar-header">  
     <ul className="clean-list">

<li  >
    <Link to={"/"} className={"flex align-center "} onClick={()=>setHeaderSearch(false)} >
    <img src={isSearch? homeIcon : homeFullIcon} />
        <span>Home</span>
    </Link>
</li>

<li >
    <Link to={"/search"} className={"flex align-center"} onClick={()=>setHeaderSearch(true)}>
    <img src={isSearch? searchFullIcon : searchIcon} />
        <span>Search</span>
    </Link>
</li>

</ul>  
        </section>)
}