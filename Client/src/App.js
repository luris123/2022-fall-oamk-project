import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navigationbar.js'
import  { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home'
import EmissionSources from './components/emissionSources'
import Temperature from './components/temperature'
import Profile from './components/user/profile.js'
import View from './components/view.js'

function App() {
  return (
    <div className='content'>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={Home()} exact />
          <Route path="/emissionSources" element={EmissionSources()} />
          <Route path="/temperature" element={Temperature()} />
          <Route path="/profile" element={Profile()} />
          <Route path="/view/:url" element={View()} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;