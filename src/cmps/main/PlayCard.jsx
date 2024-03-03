import { useSelector } from "react-redux"
//import { loadSong, setPlaying } from "../../store/actions/song.action"
//import { setCurrStation } from "../../store/actions/station.actions"
//import { Pause, Play } from "../../services/icons.service"


export function PlayCard({ item }) {

    /*const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const station = useSelector(storeState => storeState.stationsMoudle.currStation)
    const player = useSelector(storeState => storeState.playerMoudle.player)

    let cardType = (item.type === 'playlist') ? station._id : song._id

    function onPlayStation(ev) {
        ev.preventDefault()
        if (item.type === 'playlist') {
            if ((item._id !== station._id) || (song._id !== item._id)) {
                setCurrStation(item)
                loadSong(item.songs[0])
            }
        }

       else if (item.type === 'song') {
            if (item._id !== song._id) {
                loadSong(item)
            }
        }

        togglePlayPause()

    }

    function togglePlayPause() {
        if (isPlaying) {
            player.pauseVideo()
        }
        else {
            player.playVideo()

        }
        setPlaying(!isPlaying)
    }

    let showPlay = ''
    if (isPlaying && item._id === cardType) showPlay = 'show'

    return (
        <button onClick={(ev) => onPlayStation(ev)} className={"play-button " + showPlay}>
            {isPlaying && item._id === cardType ? <Pause /> : <Play />}
        </button>
    )*/
}