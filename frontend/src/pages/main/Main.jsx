import React from 'react';
import MainNavbar from './components/MainNavbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Account from './account/Account';
// import Budgeting from './budgeting/Budgeting';
import Games from './games/Games';
// import Investing from './investing/Investing';
// import Retirement from './retirement/Retirement';
// import Saving from './saving/Saving';
import Blog from './blog/Blog';
import Tools from './tools/Tools';

const Main = () => {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        {/* <Route path="/budgeting" element={<Budgeting />} /> */}
        <Route path="/games" element={<Games />} />
        {/* <Route path="/investing" element={<Investing />} />
        <Route path="/retirement" element={<Retirement />} />
        <Route path="/saving" element={<Saving />} /> */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
    </>
  );
};

export default Main;
