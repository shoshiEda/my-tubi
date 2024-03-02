import {useState, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { setSelectedSong } from "../store/song.actions.js"






export function Search(){

    const SelectedSong = useSelector(storeState => storeState.songModule.SelectedSong)
    const [input,setInput] =useState('')
    const dispatch = useDispatch();
    const setSelectedSongDebounced = useRef(utilService.debounce(selectedSong => dispatch(setSelectedSong(selectedSong))));
        


    useEffectUpdate(() => {
        setSelectedSongDebounced.current(input)
    }, [input])

    function onSetSelectedSong(ev)
    {
        ev.preventDefault()
        setSelectedSongDebounced.current(input)
    }

    function handleChange({ target }) {
       
        setInput(target.value)
    }

    return(
    <form className='search-box' onSubmit={onSetSelectedSong}>
        <img src="\src\assets\img\icons\search.svg"></img>
        <input type="text" value={input} onChange={handleChange} ></input>
        </form>
        )
}