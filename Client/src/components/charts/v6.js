import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

function V6() {

  const [icesAgeV6, setIcesAgeV6] = useState([]);
  const [co2ppmV6, setCO2ppmV6] = useState([]);

  useEffect(() => {
    try {
      chartService.getV6Data()
        .then((response) => {

          let iceAgeArrayV6 = response.map(x => x.age_before_present);
          setIcesAgeV6(iceAgeArrayV6);

          let co2ppmArrayV6 = response.map(x => x.c02_ppm);
          setCO2ppmV6(co2ppmArrayV6);

        });
    } catch (error) {
      console.log(error)
    }
  }, []);
  const options = {
    //Only reacts to mousemove events
    events: ['mousemove'],

    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Antarctic Ice Cores Revised 800KYr CO2 Data",
      },
    }
  };

  return (
    <>
      <h3>V6 Ice core 800k year composite study CO2 measurements</h3>
      <a href="https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt" target="_blank" rel="noreferrer">Data source</a>
      <br></br>
      <a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975" target="_blank" rel="noreferrer">Data description</a>
      <Line
        style={{ backgroundColor: "white" }}
        options={options}
        data={{
          labels: icesAgeV6,
          datasets: [
            {
              label: "PPM of CO2",
              data: co2ppmV6,
              borderColor: 'black'
            }
          ]
        }}
      />
    </>
  )
}

export default V6;
