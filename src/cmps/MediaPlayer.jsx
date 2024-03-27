import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import YouTube from 'react-youtube'
import { useRef } from 'react'
import { setCurrPlaying,setPlay } from '../store/system.actions'
import { editUser } from '../store/user.actions'

import { utilService } from '../services/util.service'
import { ProgressBar } from './ProgressBar'
import { FullHeart } from '../services/icons.service.jsx'
import { Heart } from '../services/icons.service.jsx'
import { Shuffle } from '../services/icons.service.jsx'
import { Repeat } from '../services/icons.service.jsx'

import notes from '../assets/img/icons/notes.svg'
import prevSong from '../assets/img/icons/prevSong.svg'
import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'
import nextSong from '../assets/img/icons/nextSong.svg'
import Volume from '../assets/img/icons/volume.svg'
import Mute from '../assets/img/icons/mute.svg'
import fullScrean from '../assets/img/icons/fullScrean.svg'



export function MediaPlayer() {
    
    const song=useSelector(storeState => storeState.systemModule.currSong) || {imgUrl:notes, name:'',artist:''}
    const station = useSelector(storeState => storeState.systemModule.currStation) || null
    const user = useSelector(storeState => storeState.userModule.user) || null
    const isPlay = useSelector(storeState => storeState.systemModule.isPlay) 

    const [isHovered, setIsHovered] = useState(false);
    const playerRef = useRef(null)
    const [isRepeat, setIsRepeat] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)
    const [playerReady, setPlayerReady] = useState(false);
    const [volume, setVolume] = useState(50);
    const [prevVolume, setPrevVolume] = useState(50);
    const [tempPlayer, setTemptPlayer] = useState(null);

    const index = user? user.likedSongs.findIndex(Song=>Song.trackId===song.trackId):-1
    const isSongLiked=index === -1 ? false : true
   
    let songIndexInStation = -1;
    if (station && station.songs) {
        songIndexInStation = station.songs.findIndex(Song => song.trackId === Song.trackId);
    }

    const opts = {
        height: '1',
        width: '1',
        playerVars: {
          autoplay: isPlay ? 1 : 0,
          controls: 0,
        },
      }

      useEffect(() => {
        if (!playerReady) return;
        const player = playerRef.current?.internalPlayer;
        if (!player) return;
        player.setVolume(volume);
        if (isPlay) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    }, [volume, isPlay, playerReady]);

    async function setIsLiked(){
        console.log(song,user)
        if(!user) return
        let updatedSong=song
        updatedSong.isLiked=!song.isLiked       
        try{
            updatedSong.isLiked?     
            editUser(user,'likedSongs',updatedSong,true)
            :
            editUser(user,'likedSongs',updatedSong,false)
        } 
        catch (error) {console.log(error)}       
    }

    async function onChangeSong(diff)
    {
        if(!station) return
        if(diff===1 && songIndexInStation!==station.songs.length-1 || (diff===-1 && songIndexInStation))
        {
            if(user){
                user.currSong=(station.songs[songIndexInStation+diff])
            } 
        }
        try{ 
            await setCurrPlaying(station.songs[songIndexInStation+diff])
        }
        catch (error) {console.log(error)}
       
    }
    


      async function onEnd() {
        if(!station || !station.songs) return
        let nextSong
        
        if (isRepeat) {
            const player = playerRef.current?.internalPlayer
            player.playVideo()
            return
        }
        else if(isShuffle){
           const idx=utilService.getRandomIntInclusive(0, station.songs.length-1)
           nextSong=station.songs[idx]
        }
         else {
            if(songIndexInStation!==station.songs.length-1)    nextSong=station.songs[songIndexInStation+1]
            else nextSong=station.songs[0]
         }
        try{ 
            await setCurrPlaying(nextSong) 
            }
            catch (error) {console.log(error)}
            }
       
        
    

    function onReady(ev) {
        setPlayerReady(true);
        setTemptPlayer(ev.target)
        }

            
   


    function handleVolumeChange({target})
    {
        const newVolume = target.value
        if (playerRef.current && playerReady) {
            playerRef.current.internalPlayer.setVolume(newVolume)
            setVolume(newVolume)}
    }

    function mute()
    {
        if(volume)
        {
            setPrevVolume(volume)
            setVolume(0)
        }
        else{
            setVolume(prevVolume)
        }
        if (playerRef.current && playerReady) {
            playerRef.current.internalPlayer.setVolume(volume)           
            }
    }
    

    const {imgUrl,name,artist,trackId} = song
    return (
        <footer className="media-player">
           <section className='song-info'>
                <div className={name?'' :'song-img'}><img className= {name?'cover-img' :'svg'} src={imgUrl} /></div>
                <div>
                    <p>{name}</p>
                    <p>{artist}</p>
                </div>
                {user &&<button className={"like-btn small animate__animated "
                                            +
                                        (isSongLiked ? 'fill empty animate__heartBeat' : 'fill animate__shakeX')}
                                        onClick={setIsLiked}>
                                        {isSongLiked ? <FullHeart /> : <Heart />}
                                    </button>}
                
           </section>
           <YouTube videoId={trackId} opts={opts} onEnd={onEnd} onReady={onReady} ref={playerRef} />
           <section className='audio-control'>
                <div className='btns'>
                    <button className={isShuffle?'fill' : 'non-fill'} onClick={()=>{setIsShuffle(!isShuffle)
                    setIsRepeat(false)}}><Shuffle/></button>
                    <button onClick={(() => onChangeSong(-1))}><img className='svg' src={prevSong}/></button>
                    <button className='play-song' onClick={()=>setPlay(!isPlay)}><img className='play-svg' src={isPlay? pause : play}/></button>
                    <button onClick={(() => onChangeSong(1))}><img className='svg' src={nextSong}/></button>
                    <button className={isRepeat?'fill' : 'non-fill'} onClick={()=>{setIsRepeat(!isRepeat)
                    setIsShuffle(false)}}><Repeat/></button>
                </div>
                <ProgressBar player={tempPlayer} />

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