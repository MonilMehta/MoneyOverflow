import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar';
import Main from './pages/main/Main';
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/main/*' element={<Main/>}/>
      <Route path='/' />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
