import { useState } from 'react'
import { useSelector } from 'react-redux'

import notes from '../assets/img/icons/notes.svg'
import shuffle from '../assets/img/icons/shuffle.svg'
import prevSong from '../assets/img/icons/prevSong.svg'
import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'
import nextSong from '../assets/img/icons/nextSong.svg'
import repeat from '../assets/img/icons/repeat.svg'
import Volume from '../assets/img/icons/volume.svg'
import Mute from '../assets/img/icons/mute.svg'
import fullScrean from '../assets/img/icons/fullScrean.svg'



export function MediaPlayer() {
    
    const song=useSelector(storeState => storeState.systemModule.currSong) || {imgUrl:notes, name:'',artist:'',isPlaying:true}
    const station = useSelector(storeState => storeState.systemModule.currStation) || null

    const [volume,setVolume]=useState(50)
    const [isHovered, setIsHovered] = useState(false);




    function handleVolumeChange({target})
    {
        setVolume(target.value)
    }

    function mute()
    {
        setVolume(0)
    }
    

    const {imgUrl,name,artist,isPlaying} = song
    return (
        <footer className="media-player">
           <section className='song-info'>
                <div className={name?'' :'song-img'}><img className= {name?'cover-img' :'svg'} src={imgUrl} /></div>
                <div>
                    <p>{name}</p>
                    <p>{artist}</p>
                </div>
                
           </section>

           <section className='audio-control'>
                <div className='btns'>
                    <button /*onClick={onShuffle}*/><img className='svg' src={shuffle} /></button>
                    <button /*onClick={(() => onChangeSong(-1))}*/><img className='svg' src={prevSong}/></button>
                    <button className='play-song'><img className='play-svg' src={isPlaying? play : pause}/></button>
                    <button /*onClick={(() => onChangeSong(1))}*/><img className='svg' src={nextSong}/></button>
                    <button /*onClick={onRepeat}*/><img className='svg' src={repeat}/></button>
                </div>
                <div className='progress-bar'>
                    <p style={{ color: 'white' }}>{/*progress ? progress.timeElapsed : '0:00'*/} </p>
                    <div /*onClick={handleProgressbar}*/ className="bar" style={{ width: '100%', height: '4px', backgroundColor: 'gray' }}>
                        <div className='bar-mov' style={{ height: '100%', /*width: `${progress ? progress.progressPercentage : 0}%`,*/ backgroundColor: 'white' }} />
                    </div>
                    <p className='text-left' style={{ color: 'white' }}>{/*progress ? progress.time :*/ '0:00'} </p>
                </div>
            </section>
            <section className="volume-section">
                <button /*onClick={toggleFullScreen}*/><img className='svg' src={fullScrean}/></button>
                <div className="volume">            
                    <input
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                        style={{backgroundImage: `linear-gradient(to right, ${isHovered ? 'rgb(82, 212, 82)' : 'white'} 0%, ${isHovered ? 'rgb(82, 212, 82)' : 'white'} calc(${volume}%), #b3b3b3 calc(${volume}% - 10px), #b3b3b3 100% `}}
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                    ></input>
                </div>
                <button onClick={mute}><img className='svg' src={volume? Volume : Mute}/></button>
            </section>          
        </footer>
    )
}