import { store } from '../store/store.js'

import { SET_SEARCH } from "./system.reducer.js";

export function setHeaderSearch() {
   
        store.dispatch({ type: SET_SEARCH })       
}