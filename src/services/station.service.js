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
    getEmptyStation,
    convertTimeFormat,
    getStationDuration,
    addSong,
    removeSong
}

async function query(type = '') {
 
    return httpService.get(BASE_URL, type)
}

async function get(stationId) {
    //const station = await storageService.get('station', stationId)
    //return station
    return httpService.get(BASE_URL + stationId)
}

async function save(station) {

    if (station._id) return httpService.put(BASE_URL  + station._id, station)
    return httpService.post(BASE_URL , station)
}

async function addSong(station,song) {

     return httpService.post(BASE_URL  + station._id+'/song', song)
}

async function removeSong(station,song) {

    return httpService.delete(BASE_URL  + station._id+`/song/${song.trackId}`, song)
}

async function remove(stationId) {
    //await storageService.remove('station', stationId)
    return httpService.delete(BASE_URL + stationId)
}

function getEmptyStation(){
    return {
        name: '', 
        type: '',
        imgUrl: imgUrl,
        createdBy:{ _id: '', username: ''},
        songs: [],
        duration: '',
        description:''
    }
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





