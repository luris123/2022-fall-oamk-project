import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios'
const URL = "http://localhost:3001"

Chart.register(...registerables);

function Temperature() {
  let years = [];
  let anomaly = [];

  const [years2, setYears] = useState([]);
  const [globalAnnualAnomaly, setGlobalAnnualAnomaly] = useState([]);
  const [globalMonthlyAnomaly, setGlobalMonthlyAnomaly] = useState([]);
  const [northernAnnualAnomaly, setNorthernAnnualAnomaly] = useState([]);
  const [northernMonthlyAnomaly, setNorthernMonthlyAnomaly] = useState([]);


  //Paikat naille voi muuttua myohemmin...
  useEffect(() => {
    try {
      const response = axios.get(URL + "/datasets")
        .then((response) => {

          console.log(response.data.v1data);
          response.data.v1data[0].globalAnnual.forEach(element => {
            years.push(element.time);
            anomaly.push(element.anomaly);
          });
          setYears(years);
          setGlobalAnnualAnomaly(anomaly);
          
          anomaly = [];
          response.data.v1data[0].globalMonthly.forEach(element => {
            anomaly.push(element.anomaly);
          });
          setGlobalMonthlyAnomaly(anomaly);

          anomaly = [];
          response.data.v1data[0].northernAnnual.forEach(element => {
            anomaly.push(element.anomaly);
          });
          setNorthernAnnualAnomaly(anomaly);

          anomaly = [];
          response.data.v1data[0].northernMonthly.forEach(element => {
            anomaly.push(element.anomaly);
          });
          setNorthernMonthlyAnomaly(anomaly);

        });

    } catch (error) {
      console.log(error)
    }
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature Anomalies from 1850",
      },
    },
  };


  //Temporary test below will be changed to chart later on...
  return (
    <div>
      <h3>V1 Temperature Anomalies (this will be replaced with a chart...)</h3>
      <Line
      style={{backgroundColor: "white"}}
        options={options}
        data={{
          labels: years2,
          datasets: [
            {
              label: "Global Annual",
              data: globalAnnualAnomaly,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Global Monthly",
              data: globalMonthlyAnomaly,
            },
            {
              label: "Northern Annual",
              data: northernAnnualAnomaly,
            },
            {
              label: "Northern Monthly",
              data: northernMonthlyAnomaly,
            }
          ]
        }}
      />
    </div>

  )
}

export default Temperature;

