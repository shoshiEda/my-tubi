import {useState, useRef} from 'react'
import { useSelector } from 'react-redux'


import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { apiService } from '../services/api.service'
import { setCurrPlaying,setPlay } from '../store/system.actions'





import play from '../assets/img/icons/play.svg'
import pause from '../assets/img/icons/pause.svg'
import Heart from '../assets/img/icons/heart.svg'









export function SearchStation({currStation,onSaveSong}){

    const [input,setInput] =useState('')
    const setSelectedSongDebounced = useRef(utilService.debounce(selectedSong => fetchSearchResults(selectedSong)));
    const user = useSelector(storeState => storeState.userModule.user)
    const currSong = useSelector(storeState => storeState.systemModule.currSong)
    const isPlay = useSelector(storeState => storeState.systemModule.isPlay)     
    const [searchList, setSearchList] = useState(null)





    useEffectUpdate(() => {
        setSelectedSongDebounced.current(input)
    }, [input])

    function onSetSelectedSong(ev)
    {
        ev.preventDefault()
        console.log(input)
        setSelectedSongDebounced.current(input)
    }

    function handleChange({ target }) {
       
        setInput(target.value)
    }

    async function onSetPlay(song,station=null){
        try{ 
            await setCurrPlaying(song,station)    
        }
        catch (error) {console.log(error)}
    }


    async function fetchSearchResults(selectedSong) {
        try {

            const searchList = await apiService.getContent(selectedSong)
            setSearchList(searchList)
        }
        catch (err) { console.log(err) }
    }

    function setSongPlay(song){
        if(currSong && currSong.trackId===song.trackId){
            setPlay(!isPlay)}
        else{
            setPlay(true)
            onSetPlay(song)
        }
    }

    

    return(
        <section className='station-search'>
            <h3>Lets search for a new song</h3>
    <form className='search-box' onSubmit={onSetSelectedSong}>
        <img src="\src\assets\img\icons\search.svg"></img>
        <input type="text" value={input} onChange={handleChange} ></input>
        </form>
        {searchList && <div className='results-section'>
                        <ul className='search-result-list clean-list'>
                            {searchList.map((song,idx) =><div key={idx} style = {{display:"none"}}>{idx}{song.name}</div>)}
                            {searchList.map((song,idx) =>
                                <li className='single-song-result grid' key={idx}>
                                    <div className='img-play-title-artist-container grid'>
                                        <div className='song-image-play' onClick={() => setSongPlay(song)}>
                                            <img className='song-img'  src={song.imgUrl}></img>
                                            
                                                 <img className="play-button svg" src={(currSong && currSong.trackId===song.trackId && isPlay) ? pause : play } />
                                                
                                        </div>

                                        <div className='song-title-artist'>
                                            <p>{song.name}</p>
                                            {(song.artist !== 'Unknown') && <p>{song.artist}</p>}
                                        </div>
                                    </div>

                                    <div className='duration-add flex'>
                                        {user && <button className='add-button' onClick={() => onSaveSong(song)}>Add</button>}
                                    </div>

                                </li>
)}
                        </ul>
                    </div>}
        </section>
        )
}