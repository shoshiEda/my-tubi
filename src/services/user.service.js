import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    updateUser,
    getEmptyCredentials,
    addUserLikedSong,
    removeUserLikedSong,
    addUserStation,
    editUserStation,
    removeUserStation,
    addUserLikedStation,
    removeUserLikedStation
}

window.userService = userService


function getUsers() {
    //return storageService.query('user')
     return httpService.get(`user`)
}



async function getById(userId) {
    //const user = await storageService.get('user', userId)
     const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    //return storageService.remove('user', userId)
     return httpService.delete(`user/${userId}`)
}

async function updateUser(user) {
   
    //await storageService.put('user', user)
     const updatedUser = await httpService.put(`user/${user._id}`, user)

    // When admin updates other user's details, do not update loggedinUser
    if (getLoggedinUser()._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
}

async function addUserLikedSong(user,song) {
   
     const updatedSong = await httpService.post(`user/${user._id}/song`, song)
     user.likedSongs? user.likedSongs.push(updatedSong) : user.likedSongs[0]=updatedSong
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function removeUserLikedSong(user,song) {
   
    const DeletedSongId = await httpService.delete(`user/${user._id}/song/${song.trackId}`, song)
    const idx = user.likedSongs.findIndex(song=>song.trackId===DeletedSongId)
    user.likedSongs.splice(idx,1)

    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function addUserStation(user,station) {

    console.log(user,station)
   try{
    const updatedStation  = await httpService.post(`user/${user._id}/station`, station)
    user.stations ? user.stations.unshift(updatedStation) : user.stations=[updatedStation]
   if (getLoggedinUser()._id === user._id) saveLocalUser(user)
   console.log(user)
   return user
   }
   catch(err){
    console.log(err)
    throw err
}
}

async function editUserStation(user,station) {

   try{
    const updatedStation = await httpService.put(`user/${user._id}/station/${station._id}`, station) 
    console.log(updatedStation)
    const idx = user.stations.findIndex(Station=>Station._id===station._id)
    user.stations[idx]=updatedStation
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
   return user
   }
   catch(err){
    console.log(err)
    throw err
}
}

async function removeUserStation(user,station) {
  
   const DeletedStationId = await httpService.delete(`user/${user._id}/station/${station._id}`, station)
   const idx = user.stations.findIndex(station=>station._id===DeletedStationId)
   user.stations.splice(idx,1)

   if (getLoggedinUser()._id === user._id) saveLocalUser(user)
   return user
}


async function login(userCred) {
    //const users = await storageService.query('user')
    //const user = users.find(user => user.username === userCred.username)
     const user = await httpService.post('auth/login', userCred)
    if (user) return saveLocalUser(user)
}

async function signup(userCred) {
    //const user = await storageService.post('user', userCred)
     const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    //sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
     return await httpService.post('auth/logout')
}


function saveLocalUser(user) {
    user = { _id: user._id, username: user.username, imgUrl: user.imgUrl || '' ,likedSongs:user.likedSongs || [],stations:user.stations|| [],likedStations:user.likedStations || [], currSong:user.currSong || null, currStation:user.currStation|| null }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials(email = '', imgUrl = "", username = '', password = '', stations = [], likedSongs = [],likedStations=[]) {
    return {
        email,
        username,
        password,
        stations,
        imgUrl,
        likedSongs,
        likedStations
    }
}

async function addUserLikedStation(user,station) {

    console.log(user,station)
   try{
    const updatedStation  = await httpService.post(`user/${user._id}/liked-station`, station)
    user.likedStations ? user.likedStations.unshift(updatedStation) : user.likedStations=[updatedStation]
   if (getLoggedinUser()._id === user._id) saveLocalUser(user)
   console.log(user)
   return user
   }
   catch(err){
    console.log(err)
    throw err
}
}

async function removeUserLikedStation(user,station) {
  
   const DeletedStationId = await httpService.delete(`user/${user._id}/liked-station/${station._id}`, station)
   const idx = user.likedStations.findIndex(station=>station._id===DeletedStationId)
   user.likedStations.splice(idx,1)

   if (getLoggedinUser()._id === user._id) saveLocalUser(user)
   return user
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



