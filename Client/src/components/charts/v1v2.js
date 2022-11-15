import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

function V1V2() {

  const [globalAnnualYears1, setGlobalAnnualYears1] = useState([]);
  const [globalAnnualyAnomaly1, setGlobalAnnualAnomaly1] = useState([]);
  const [globalMonthlyAnomaly1, setGlobalMonthlyAnomaly1] = useState([]);
  const [northernAnnualAnomaly1, setNorthernAnnualAnomaly1] = useState([]);
  const [northernMonthlyAnomaly1, setNorthernMonthlyAnomaly1] = useState([]);
  const [southernAnnualAnomaly1, setSouthernAnnualAnomaly1] = useState([]);
  const [southernMonthlyAnomaly1, setSouthernMonthlyAnomaly1] = useState([]);

  const [v2DataYears1, setV2DataYears1] = useState([]);
  const [v2DataTempature1, setV2DataTempature1] = useState([]);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      chartService.getV1Data()
        .then((response) => {

          let globalAnnualYears = response[0].globalAnnual.map(x => x.time);
          setGlobalAnnualYears1(globalAnnualYears);

          let globalAnnualAnomaly = response[0].globalAnnual.map(x => x.anomaly);
          setGlobalAnnualAnomaly1(globalAnnualAnomaly);

          let globalMonthlyAnomaly = response[0].globalMonthly.map(x => x.anomaly);
          setGlobalMonthlyAnomaly1(globalMonthlyAnomaly);

          let northernAnnualAnomaly = response[0].northernAnnual.map(x => x.anomaly);
          setNorthernAnnualAnomaly1(northernAnnualAnomaly);

          let northernMonthlyAnomaly = response[0].northernMonthly.map(x => x.anomaly);
          setNorthernMonthlyAnomaly1(northernMonthlyAnomaly);

          let southernAnnualAnomaly = response[0].southernAnnual.map(x => x.anomaly);
          setSouthernAnnualAnomaly1(southernAnnualAnomaly);

          let southernMonthlyAnomaly = response[0].southernMonthly.map(x => x.anomaly);
          setSouthernMonthlyAnomaly1(southernMonthlyAnomaly);

        });

      chartService.getV2Data()
        .then((response) => {
          let v2DataYears = response.map(x => x.year);
          let v2DataTempature = response.map(x => x.t)
          setV2DataYears1(v2DataYears);
          setV2DataTempature1(v2DataTempature);
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
        text: "Global historical surface temperature anomalies from January 1850 onwards",
      },
    }
  };

  return (
    <>
      <h3>V1 Global historical surface temperature anomalies from January 1850 onwards<br/>V2 Northern Hemisphere 2,000-year temperature reconstruction</h3>
      <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" target="_blank">V1 Data source</a>
      <br></br>
      <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank">V2 Data measurement description<br/></a>
      <button onClick={() => setVisible(!visible)}>Change view</button>
      <Line
        style={{ backgroundColor: "white" }}
        options={options}
        data={{
          labels: globalAnnualYears1,
          datasets: [
            {
              label: "Global Annual",
              data: globalAnnualyAnomaly1,
              borderColor: 'black',
              hidden: visible
            },
            {
              label: "Global Monthly",
              data: globalMonthlyAnomaly1,
              borderColor: 'black',
              hidden: !visible
            },
            {
              label: "Northern Annual",
              data: northernAnnualAnomaly1,
              borderColor: 'blue',
              hidden: visible
            },
            {
              label: "Northern Monthly",
              data: northernMonthlyAnomaly1,
              borderColor: 'blue',
              hidden: !visible
            },
            {
              label: "Southern Annual",
              data: southernAnnualAnomaly1,
              borderColor: 'red',
              hidden: visible
            },
            {
              label: "Southern Monthly",
              data: southernMonthlyAnomaly1,
              borderColor: 'red',
              hidden: !visible
            },
          ]
        }}
      />
    </>
  )
}

export default V1V2;
