/*import { utilService } from '../services/util.service'
import { apiService } from '../services/api.service'
import { Fragment, useEffect, useState } from 'react'
import { PlayCard } from '../cmps/main/PlayCard'
import { useNavigate, useParams } from "react-router"
import { useSelector } from 'react-redux'
import { saveSong } from '../store/actions/song.action'
import { saveStation } from '../store/actions/station.actions'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { LikeCard } from '../cmps/main/LikeCard'*/

export function SearchPage() {

    /*const [searchList, setSearchList] = useState(null)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const genres = ["New", 'Music', 'Pop', 'Hip-Hop', 'Rap', 'Latino', 'indi', 'Rock', 'Podcusts', 'Live', 'Sport', 'Meditation', 'Party', 'Electronic', 'For sleep']

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        params.searchTerm ? fetchSearchResults() : setSearchList(null)
    }, [params.searchTerm])

    useBackgroundFromImage('')


    async function fetchSearchResults() {
        try {

            const searchList = await apiService.getContent(params.searchTerm)
            setSearchList(searchList)
        }
        catch (err) { console.log(err) }
    }

    async function onSaveSong(song) {
        try {
            const savedSong = await saveSong(song)
            const downloadStation = user.stations[1]
            downloadStation.songs.push(savedSong)
            saveStation(downloadStation)

        }
        catch (err) { console.log(err) }
    }

    // console.log('Render-Search page')
    return (
        <section>
            {!params.searchTerm &&
                <Fragment>
                    <h1 className='browse-all'>Browse all</h1>
                    <ul className="ganeres-list">
                        {genres.map(ganere =>
                            <li key={ganere} style={{ backgroundColor: utilService.getRandomColor() }} onClick={() => navigate('/search/' + ganere)}>
                                {ganere}<img src={`src/assets/img/${ganere}.jpg`}></img></li>
                        )}
                    </ul>
                </Fragment>
            }
            {searchList &&

                <div className='search-hero grid'>
                    <div>
                        <h2 className="section-title">Top result</h2>
                    </div>
                    <div className='top-result-section'>
                        <div className='image-container'>
                            <img className='top-result-image' src={searchList[0].imgUrl}></img>
                        </div>
                        <div className='details-container'>
                            <h3>{searchList[0].name}</h3>
                            <p><span>Type</span> <span>Artist</span></p>
                        </div>
                    </div>

                    <div>
                        <h2 className="section-title">Songs</h2>
                    </div>

                    <div className='results-section'>
                        <ul className='search-result-list clean-list'>
                            {searchList.map(song =>
                                <li className='single-song-result grid' key={song.trackId}>

                                    <div className='img-play-title-artist-container grid'>
                                        <div className='song-image-play'>
                                            <img src={song.imgUrl}></img>
                                            <PlayCard item={song}></PlayCard>
                                        </div>

                                        <div className='song-title-artist'>
                                            <p>{song.name}</p>
                                            {(song.artist !== 'Unknown') && <p>{song.artist}</p>}
                                        </div>
                                    </div>

                                    <div className='duration-add grid'>
                                         <LikeCard></LikeCard> // cant add like card because search results dont have id? 
                                        <p>{song.duration}</p>
                                        {user && <button className='add-button' onClick={() => onSaveSong(song)}>ADD</button>}
                                    </div>

                                </li>
                            )}
                        </ul>
                    </div>

                </div>
            }

            {(!searchList && params.searchTerm) && <div>...loading</div>}
        </section >)
*/
}