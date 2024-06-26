import { userService } from "../services/user.service.js";
import { utilService } from "../services/util.service.js";
import { socketService } from "../services/socket.service.js";
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
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

export async function editUser(user){
   
    try{
        const updatedUser = await userService.updateUser(user)
        store.dispatch({ type: SET_USER, user:updatedUser })
        return updatedUser
    }
    catch(err){
        console.log(err)
    }
}


export async function setLikedSongs(song,isAdd=true){
    const user = await userService.getLoggedinUser()
    if(isAdd){
        try{
            const updatedUser = await userService.addUserLikedSong(user,song)
            store.dispatch({ type: SET_USER, user:updatedUser })
            return updatedUser
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        try{
            const updatedUser = await userService.removeUserLikedSong(user,song)
            store.dispatch({ type: SET_USER, user:updatedUser })
            return updatedUser
        }
        catch(err){
            console.log(err)
        }
    }

}



export async function setUserStations(station,isAdd=true){
    console.log(station)
    const user = await userService.getLoggedinUser()
    if(isAdd){
        try{
            const updatedUser = await userService.addUserStation(user,station)
            store.dispatch({ type: SET_USER, user:updatedUser })
            console.log(updatedUser)
            return updatedUser
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        try{
            const updatedUser = await userService.removeUserStation(user,station)
            console.log(updatedUser)
            store.dispatch({ type: SET_USER, user:updatedUser })
            return updatedUser
        }
        catch(err){
            console.log(err)
        }
    }

}

export async function editUserStations(station){
    const user = await userService.getLoggedinUser()
        try{
            const newUser = await userService.editUserStation(user,station)
            console.log('newUser:',newUser)
            store.dispatch({ type: SET_USER, user:newUser })
            return newUser
        }
        catch(err){
            console.log(err)
        }
    }

    export async function setUserLikedStations(station,isAdd=true){
        console.log(station)
        const user = await userService.getLoggedinUser()
        if(isAdd){
            try{
                const updatedUser = await userService.addUserLikedStation(user,station)
                store.dispatch({ type: SET_USER, user:updatedUser })
                console.log(updatedUser)
                return updatedUser
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            try{
                const updatedUser = await userService.removeUserLikedStation(user,station)
                console.log(updatedUser)
                store.dispatch({ type: SET_USER, user:updatedUser })
                return updatedUser
            }
            catch(err){
                console.log(err)
            }
        }
    
    }



