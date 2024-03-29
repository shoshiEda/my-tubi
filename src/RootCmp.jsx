import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import {useSelector} from 'react-redux'

import { HomePage } from './pages/HomePage.jsx'
import { StationDetails } from './pages/StationDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { MediaPlayer } from './cmps/MediaPlayer'
import { UserDetails } from './pages/UserDetails'
import { SearchPage } from './pages/SearchPage'
import { StationsOfType } from './pages/StationsOfType.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { UserLibaryIndex } from './pages/UserLibaryIndex.jsx'
import { LeftSideBar } from './cmps/LeftSidebar/LeftSidebar.jsx'
import { BottomManu } from './cmps/BottomManu.jsx'
import { checkDevice } from './store/system.actions.js'







export function RootCmp() {

    const isComputer = useSelector(storeState => storeState.systemModule.isComputer)

    checkDevice()

    return (
        <div className={isComputer? 'main-container' :"main-container-for-mobile"}>
          <Router>
            {isComputer && <LeftSideBar />}
            <div className="main-content">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/type/:type" element={<StationsOfType />} />
                    <Route path="station/:id" element={<StationDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />`
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/search/:searchTerm" element={<SearchPage />} />
                    <Route path='/mobile/libary' element={<UserLibaryIndex />} />
                </Routes>
            </div>
                <MediaPlayer />
                <UserMsg />
                {!isComputer && <BottomManu />}
        </Router>
        </div>
    )
}


