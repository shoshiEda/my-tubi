import { httpService } from "./http.service"
import { utilService } from "./util.service"
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import LikedCover from '../assets/img/pics/liked-cover.png'



const BASE_URL = 'station/'
const loggedInUser=userService.getLoggedinUser()

export const stationService = {
    query,
    get,
    save,
    remove,
    getDefaultStation,
    getEmptyStation,
    convertTimeFormat,
    getStationDuration
}

async function query(type = '') {
    try{
        let stations = await storageService.query('station')
        console.log(stations)
        if(type) stations = stations.filter(station=> station.type===type)
        return stations
    }
    catch (err) {
        console.log('Station Action -> Cannot load stations', err)
        throw err
    }
    
    //return httpService.get(BASE_URL, filterSortBy)
}

async function get(stationId) {
    const station = await storageService.get('station', stationId)
    return station
    //return httpService.get(BASE_URL + stationId)
}

async function save(stationData) {
   

    if (stationData._id){
        const updatedStation = await storageService.put('station', stationData)
        return updatedStation
    }
    else{
        stationData.createdBy = loggedInUser.username
        const newStation = await storageService.post('station', stationData)
        return newStation
    }

    /*const edit = 'edit/'
    if (station._id) return httpService.put(BASE_URL + edit + station._id, station)
    return httpService.post(BASE_URL + edit, station)*/

}

async function remove(stationId) {
    await storageService.remove('station', stationId)
   // return httpService.delete(BASE_URL + stationId)
}

function getEmptyStation(name = '', idx = '', imgUrl = '', createdBy = { _id: '', username: '', }) {
    console.log("createdBy:", createdBy)
    return {

        name: name + idx,
        stationListTitle: '',
        type: "playlist",
        tags: [],
        imgUrl: imgUrl,
        createdBy:createdBy,
        likedByUsers: 0,
        songs: [],
        duration: '',
        description:''
    }
}

function getDefaultStation() {

    let station = {
        "_id": utilService.makeId(),
        "name": utilService.makeLorem(2),
        "stationListTitle": 'Welcome to YoutubeFy',
        "type": "playlist",
        "tags": ["deafult"],
        "stationImgUrl": 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
        "createdBy": {
            "_id": utilService.makeId(),
            "username": utilService.makeLorem(1),
            "profileImg": ""
        },
        "likedByUsers": ['', ''],
        description:''

    }

    let songs = []
    station.songs = songs
    return station
}


function getStationDuration(items) {
    let totalMinutes = 0

    items.forEach(item => {
        const timeParts = item.duration.split(':').map(part => parseInt(part, 10))

        if (timeParts.length === 2) {
            totalMinutes += timeParts[0]
            totalMinutes += timeParts[1] / 60
        } else if (timeParts.length === 3) {
            totalMinutes += timeParts[0] * 60
            totalMinutes

                += timeParts[1]
            totalMinutes += timeParts[2] / 60
        }
    })
    const totalHours = Math.floor(totalMinutes / 60)
    const remainingMinutes = Math.floor(totalMinutes % 60)
    const remainingSeconds = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60)

    let formattedTotalRunTime = `${String(totalHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`
    if (remainingSeconds > 0) {
        formattedTotalRunTime += `:${String(remainingSeconds).padStart(2, '0')}`
    }

    return formattedTotalRunTime
}

function convertTimeFormat(timeStr) {
    const parts = timeStr.split(':').map(part => parseInt(part, 10))
    let formattedTime = []

    if (parts.length === 2) {
        if (parts[0] > 0) formattedTime.push(`${parts[0]} minutes`)
        if (parts[1] > 0) formattedTime.push(`${parts[1]} seconds`)
    } else if (parts.length === 3) {
        if (parts[0] > 0) formattedTime.push(`${parts[0]} hours`)
        if (parts[1] > 0) formattedTime.push(`${parts[1]} minutes`)
        if (parts[2] > 0) formattedTime.push(`${parts[2]} seconds`)
    } else {
        return 'Invalid format'
    }

    return formattedTime.join(' and ')
}





