
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/cart' element={<Cart />}></Route>
      </Routes> 
    </div>
  );
}

export default App;
