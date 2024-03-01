import { LeftSideBarManu } from './LeftSideBarManu.jsx'
import { LeftSideBarLibrary } from './LeftSideBarLibrary.jsx'

export function LeftSideBar(){

    return (
        <div className='left-sidebar'>
            <LeftSideBarManu />
            <LeftSideBarLibrary />
        </div>
    )
}