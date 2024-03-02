import { store } from '../store/store.js'

import { SET_SEARCH } from "./system.reducer.js";

export function setHeaderSearch(isTrue) {
   
        store.dispatch({ type: SET_SEARCH ,isTrue })       
}