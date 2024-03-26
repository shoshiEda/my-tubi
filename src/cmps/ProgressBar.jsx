import { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'

import { utilService } from "../services/util.service"

export function ProgressBar({ player}) {

    const song=useSelector(storeState => storeState.systemModule.currSong) || null

    const [progress, setProgress] = useState(null)
    const intervalRef = useRef(null)

    useEffect(() => {

        if (!song) 
        setProgress('0.00')
        const updateProgress = () => {

            if (player && player.getCurrentTime && player.getDuration) {

                const currentTime = player.getCurrentTime()
                const duration = player.getDuration()
                const progressPercentage = (currentTime / duration) * 100
                const timeElapsed = utilService.formatTime(currentTime)
                const time = utilService.formatTime(duration)
                setProgress({ progressPercentage, timeElapsed, time })
            }
        }
        if (player ) {
            clearInterval(intervalRef.current)
            intervalRef.current = setInterval(updateProgress, 237)
        }

    }, [player,song])

    function handleProgressbar(ev) {

        const progressBar = ev.target
        const clickPosition = (ev.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth
        const newTime = clickPosition * player.getDuration()
    
        player.seekTo(newTime)
        setProgress(clickPosition)
      }
    
     


    return (
        <div className='progress-bar flex align-center'>
            <p style={{ color: 'white' }}>{progress ? progress.timeElapsed : '0:00'} </p>
            <div onClick={handleProgressbar} className="bar" style={{ width: '100%', height: '5px', backgroundColor: 'gray' }}>
                <div className='bar-mov' style={{ height: '100%', width: `${progress ? progress.progressPercentage : 0}%`, backgroundColor: 'white' }} />
            </div>
            <p className='text-left' style={{ color: 'white' }}>{song ? song.duration : '0:00'} </p>
        </div>
    )

}