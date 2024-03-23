import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import { HomePage } from './pages/HomePage.jsx'
import { StationDetails } from './pages/StationDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { MediaPlayer } from './cmps/MediaPlayer'
import { UserDetails } from './pages/UserDetails'
import { SearchPage } from './pages/SearchPage'
import { StationsOfType } from './pages/StationsOfType.jsx'
import { LeftSideBar } from './cmps/LeftSidebar/LeftSidebar.jsx'



export function RootCmp() {

    return (
        <div className='main-container'>
          <Router>
            <LeftSideBar />
            <div className="main-content">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/type/:type" element={<StationsOfType />} />
                    <Route path="station/:id" element={<StationDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />`
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/search/:searchTerm" element={<SearchPage />} />
                </Routes>
            </div>
                <MediaPlayer />
        </Router>
        </div>
    )
}


