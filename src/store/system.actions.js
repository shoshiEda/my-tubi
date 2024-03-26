import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { SET_SEARCH,SET_CURR_SONG,SET_CURR_STATION,SET_PLAY } from '../store/system.reducer'
import { editUser } from '../store/user.actions'


export function setHeaderSearch(value){
    store.dispatch({
        type: SET_SEARCH,
        value
    })
}

export function setPlay(term){
    store.dispatch({
        type: SET_PLAY,
        term
    })
}

export async function setCurrPlaying(song,station=null)
{
    const user=userService.getLoggedinUser()
    store.dispatch({
        type: SET_CURR_SONG,
        song
    })
    if(station) 
    {
        store.dispatch({
            type: SET_CURR_STATION,
            station
        })
    }
    if(user){
        user.currSong=song
        if(station) user.currStation=station
    }   
    try{ 
        if(user)await editUser(user)     
    }
    catch (error) {console.log(error)}
}



