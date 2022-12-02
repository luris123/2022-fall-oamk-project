import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navigationbar.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home'
import EmissionSources from './components/emissionSources'
import Temperature from './components/temperature'
import Profile from './components/user/profile.js'
import View from './components/view.js'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const DatasetsContext = React.createContext();

function App() {

  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/datasets');
        setDatasets(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  
  return (
    <div className='content'>
      <BrowserRouter>
        <DatasetsContext.Provider value={datasets}>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={Home()} exact />
            <Route path="/emissionSources" element={EmissionSources()} />
            <Route path="/temperature" element={Temperature()} />
            <Route path="/view/:url" element={View()} />
            <Route path="/profile" element={Profile()} />
          </Routes>
        </DatasetsContext.Provider>
      </BrowserRouter>
    </div >
  );
}

export default App;