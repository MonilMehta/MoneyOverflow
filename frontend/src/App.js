import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Main from './pages/main/Main';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/main/*' element={<Main/>}/>
      <Route path='/' element={<LandingPage/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
