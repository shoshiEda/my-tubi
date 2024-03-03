import {useState, useRef} from 'react'
import { useNavigate } from "react-router"


import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"






export function Search(){

    const [input,setInput] =useState('')
    const setSelectedSongDebounced = useRef(utilService.debounce(selectedSong => navigate('/search/' + selectedSong)));
    const navigate = useNavigate()



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

    return(
    <form className='search-box' onSubmit={onSetSelectedSong}>
        <img src="\src\assets\img\icons\search.svg"></img>
        <input type="text" value={input} onChange={handleChange} ></input>
        </form>
        )
}