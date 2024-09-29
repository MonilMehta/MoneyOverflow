import React from 'react'
import MainNavbar from './components/MainNavbar'
import { Route,Routes } from 'react-router-dom'
import Home from './Home/Home'
import Account from './account/Account'
import Budgeting from './budgeting/Budgeting'
import Games from './games/Games'
import Investing from './investing/Investing'
import Retirement from './retirement/Retirement'
import Saving from './saving/Saving'
const Main = () => {
  return (
    <>
     <MainNavbar/>
    <Routes>
        <Route  path="/main/home" element={<Home />} />
        <Route  path="/main/account" element={<Account />} />
        <Route  path="/main/budgeting" element={<Budgeting />} />
        <Route  path="/main/games" element={<Games />} />
        <Route  path="/main/investing" element={<Investing />} />
        <Route  path="/main/retirement" element={<Retirement />} />
        <Route  path="/main/saving" element={<Saving />} />
        
    </Routes>
    </>
  )
}

export default Main
