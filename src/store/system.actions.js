import { store } from '../store/store.js'
import { SET_SEARCH,SET_CURR_SONG,SET_CURR_STATION } from '../store/system.reducer'

export function setHeaderSearch(value){
    store.dispatch({
        type: SET_SEARCH,
        value
    })
}

export function setCurrPlaying(song,station=null)
{
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
}