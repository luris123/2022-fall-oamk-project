import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect,  useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Navbar from './components/navbar/navigationbar.js'
import Home from './components/home'
import EmissionSources from './components/emissionSources'
import Temperature from './components/temperature'
import Profile from './components/user/profile.js'
import View from './components/view.js'

import DatasetsContext from './context/datasetProvider.js'

function App() {

  const baseUrl = 'https://group5-visualizationtool.onrender.com';

  const { datasets, setDatasets } = useContext(DatasetsContext);
  //gets datasets from server and sets them to state so components can use them
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(baseUrl + '/datasets');
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
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={Home()} exact />
          <Route path="/emissionSources" element={EmissionSources()} />
          <Route path="/temperature" element={Temperature()} />
          <Route path="/view/:url" element={View()} />
          <Route path="/profile" element={Profile()} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;