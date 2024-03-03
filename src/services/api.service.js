import axios from "axios"
import { utilService } from "./util.service"


const API_KEY_YT = 'AIzaSyBt3urdJrr50IMTzRjY3cCqzpdxR8jmIRc'
//const API_KEY_YT = 'AIzaSyAq166O0Zx4knj4zTocORMEpmej0XPnLIc'
//const API_KEY_YT = 'AIzaSyBu-GdAUp7awvELMR3iigsESqtzB7qLekI'
const API_KEY_LAST_FM = 'a07417914f1e93617c8e6b02d8f52c86'
const URL_ARTIST_TUBE = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&`
const URL_PLAYLIST_TUBE = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY_YT}&`
const URL_WIKI = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&`

const maxResults = 5

export const apiService = {
    getContent,

}

async function getContent(search) {

    const destTube = `part=snippet&q=${search}&videoCategoryId=10&type=video&maxResults=${maxResults}`
    try {
        const responseArtist = await axios.get(URL_ARTIST_TUBE + destTube)

        const promisesSongs = responseArtist.data.items.map(async ytItem => {
            try {
                const searchInfo = parseSongString(ytItem.snippet.title)
                const duration = await _getDuration(ytItem.id.videoId)
                return {

                    name: searchInfo.name,
                    artist: searchInfo.artist,
                    type: 'song',
                    duration: duration,
                    trackId: ytItem.id.videoId,
                    imgUrl: ytItem.snippet.thumbnails.medium.url,
                    addedBy: 'artist',
                    addedAt: Date.now(),
                    likedBy: [],
                    tags: []
                }
            }
            catch (err) { throw err }
        })
        const results = await Promise.all(promisesSongs)
        return results

    }
    catch (err) { throw err }

}

function parseSongString(songString) {
    songString = songString.replace(/\[.*?\]|\(.*?\)/g, '')
    const splitIndex = songString.search(/[^a-zA-Z0-9 ]/)
    let artist
    let name

    if (splitIndex !== -1) {
        artist = songString.substring(0, splitIndex).trim()
        name = songString.substring(splitIndex + 1).trim()
    } else {
        artist = 'Unknown'
        name = songString.trim()
    }

    artist = artist.replace(/[^a-zA-Z0-9]/g, '')
    name = name.replace(/[^a-zA-Z0-9]/g, '')

    artist = artist.length > 12 ? artist.substring(0, 12) + '...' : artist
    name = name.length > 12 ? name.substring(0, 12) + '...' : name

    if (!artist) artist = 'Unknown'
    if (!name) name = 'Unknown'

    return { artist, name }


}
// function parseSongString(songString) {
//     const parts = songString.split(' - ')
//     if (parts.length === 2) return { artist: parts[0] || '', name: parts[1] || '' }
//     else if (parts.length === 1) return { artist: 'Unknown' || '', name: parts[0] || '' }
//     else return { artist: 'Unknown', title: 'Unknown' }

// }


async function _getDuration(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY_YT}`
    try {
        const duration = await axios(url)
        const fixDuration = formatDuration(duration.data.items[0].contentDetails.duration)
        return fixDuration
    }
    catch (err) { console.log(err) }

}

function formatDuration(duration) {

    if (duration === 'P0D') return '99:99:99'

    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    const matches = duration.match(regex)

    if (matches) {
        const hours = matches[1] ? parseInt(matches[1], 10) : 0
        const minutes = matches[2] ? parseInt(matches[2], 10) : 0
        const seconds = matches[3] ? parseInt(matches[3], 10) : 0

        if (hours > 0) {
            return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(seconds)}`
        } else {
            return `${padWithZero(minutes)}:${padWithZero(seconds)}`
        }
    }
    return "01:00"
}

function padWithZero(number) {
    return number.toString().padStart(2, '0')
}






