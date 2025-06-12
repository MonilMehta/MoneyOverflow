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
import Learning from './learning/Learning';
import Blog from './blog/Blog';
import Tools from './tools/Tools';
import BlogPosts from './blog/Blog2';
import BlogPage from './blog/BlogPage';
import BusinessNewsApp from './News/Business';
import Premium from './premium/Premium';
import Simulation from './simulation/Simulation';import Chatbot from './components/Chatbot';
import FAQ from './about/FAQ';
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
        {/* <Route path="/blogs" element={<Blog />} /> */}
        <Route path="/blogs" element={<BlogPosts />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/news" element={<BusinessNewsApp />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/about" element={<FAQ />} />
      </Routes>
      <Chatbot /> 
    </>
  );
};

export default Main;
