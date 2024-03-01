import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage.jsx'
import { StationDetails } from './pages/StationDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { LeftSideBarManu } from './cmps/LeftSideBarManu.jsx'
import { LeftSideBarLibrary } from './cmps/LeftSideBarLibrary.jsx'
import { UserDetails } from './pages/UserDetails'
import { SearchPage } from './pages/SearchPage'


export function RootCmp() {

    return (
        <div className='main-container'>
            <AppHeader />
            <LeftSideBarManu/>
            <LeftSideBarLibrary/>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="station/:id" element={<StationDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />`
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


