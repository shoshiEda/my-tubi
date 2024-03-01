import { Link } from 'react-router-dom'
import {setHeaderSearch} from '../store/system.actions.js'

import  homeIcon  from '../assets/img/icons/home.svg'
import  searchIcon  from '../assets/img/icons/search.svg'


export function LeftSideBarManu(){


    return(<section className="lets-side-bar-manu">    
           
                <img src={homeIcon} />
                <Link to="/">Homescreen</Link>
                <img src={searchIcon} />
            <Link to="/search" onClick={setHeaderSearch}>search</Link>
        </section>)
}