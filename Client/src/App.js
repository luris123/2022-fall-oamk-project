import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Navbar from './components/navbar/navigationbar.js'
import Home from './components/home'
import EmissionSources from './components/emissionSources'
import Temperature from './components/temperature'
import Profile from './components/user/profile.js'
import View from './components/view.js'

export const DatasetsContext = React.createContext();

function App() {

  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/datasets');
        setDatasets(response.data);
        console.log(response.data);
        response.data.v2data.map(x => {
          if (x.year > 1980) {
            console.log(x.year);
          }
        })
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