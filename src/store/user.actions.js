import { userService } from "../services/user.service.js";
import { utilService } from "../services/util.service.js";
import { socketService } from "../services/socket.service.js";
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import {  SET_USER , LOGOUT_USER } from "./user.reducer.js";




export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: LOGOUT_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function editUser(user,field='',value='',isAdd= undefined){
    if(isAdd && isAdd!==undefined){
        if (!Array.isArray(user[field]))    user[field]=[]     
        user[field].push(value)
    }
    else if(isAdd===false){
        if(field==='likedSongs')
        {
            const idx = user[field].findIndex(obj => obj.trackId===value.trackId)
            user[field].splice(idx,1)
        }
        else{
            const idx = user[field].findIndex(obj => obj._id===value._id)
            user[field].splice(idx,1)
        }
    }
    try{
        const updatedUser = await userService.updateUser(user)
        store.dispatch({ type: SET_USER, user:updatedUser })
        return updatedUser
    }
    catch(err){
        console.log(err)
    }
}

