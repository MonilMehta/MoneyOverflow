import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Main from './pages/main/Main';
import SignupSignin from './pages/auth/SigninSignup';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/main/*' element={<Main/>}/>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/auth' element={<SignupSignin/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
