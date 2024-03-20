import { SET_SEARCH } from "./system.reducer.js";
import { store } from '../store/store.js'

export function setHeaderSearch(term){
    store.dispatch({ type: SET_SEARCH ,term})
}

export function setContextMenu(){}
