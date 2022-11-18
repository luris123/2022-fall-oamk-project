import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';


Chart.register(...registerables);

function V1V2() {

  const [v1Data, setV1Data] = useState([]);
  const [v2Data, setV2Data] = useState([]);

  const [visible, setVisible] = useState(false);
  const [v2Toggle, setV2Toggle] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/datasets');

        for (let i = 0; i < response.data.v1data[0].globalAnnual.length; i++) {
          response.data.v1data[0].globalAnnual[i].time = response.data.v1data[0].globalAnnual[i].time.toString();
          response.data.v1data[0].globalAnnual[i].anomaly = response.data.v1data[0].globalAnnual[i].anomaly.toString();

          response.data.v1data[0].globalMonthly[i].time = response.data.v1data[0].globalMonthly[i].time.toString();
          response.data.v1data[0].globalMonthly[i].anomaly = response.data.v1data[0].globalMonthly[i].anomaly.toString();

          response.data.v1data[0].northernAnnual[i].time = response.data.v1data[0].northernAnnual[i].time.toString();
          response.data.v1data[0].northernAnnual[i].anomaly = response.data.v1data[0].northernAnnual[i].anomaly.toString();

          response.data.v1data[0].northernMonthly[i].time = response.data.v1data[0].northernMonthly[i].time.toString();
          response.data.v1data[0].northernMonthly[i].anomaly = response.data.v1data[0].northernMonthly[i].anomaly.toString();

          response.data.v1data[0].southernAnnual[i].time = response.data.v1data[0].southernAnnual[i].time.toString();
          response.data.v1data[0].southernAnnual[i].anomaly = response.data.v1data[0].southernAnnual[i].anomaly.toString();

          response.data.v1data[0].southernMonthly[i].time = response.data.v1data[0].southernMonthly[i].time.toString();
          response.data.v1data[0].southernMonthly[i].anomaly = response.data.v1data[0].southernMonthly[i].anomaly.toString();
        }

        for (let i = 0; i < response.data.v2data.length; i++) {
          response.data.v2data[i].year = response.data.v2data[i].year.toString();
          response.data.v2data[i].t = response.data.v2data[i].t.toString();
        }

        for (let j = 1980; j <= 2023; j++) {
          response.data.v2data[j] = {
            "year": null,
            "t": null
          }
        }

        setV1Data(response.data.v1data[0]);
        setV2Data(response.data.v2data);

      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const options = {
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      point: {
        radius: 0
      }
    },
    //Only reacts to mousemove events
    //events: ['mousemove'],
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year'
        },
      }
    },

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

  const data = {
    datasets: [
      {
        label: "Global Annual",
        data: v1Data.globalAnnual,
        borderColor: 'black',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: visible
      },
      {
        label: "Northern Hemisphere Annual",
        data: v1Data.northernAnnual,
        borderColor: 'blue',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: visible
      },
      {
        label: "Southern Hemisphere Annual",
        data: v1Data.southernAnnual,
        borderColor: 'red',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: visible
      },
      {
        label: "Global Monthly",
        data: v1Data.globalMonthly,
        borderColor: 'black',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: !visible
      },
      {
        label: "Northern Hemisphere Monthly",
        data: v1Data.northernMonthly,
        borderColor: 'blue',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: !visible
      },
      {
        label: "Southern Hemisphere Monthly",
        data: v1Data.southernMonthly,
        borderColor: 'red',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: !visible
      },
      {
        label: "2000 Year Temperatures",
        data: v2Data,
        borderColor: 'green',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'year',
          yAxisKey: 't'
        },
        hidden: v2Toggle
      },

    ]
  }

  return (
    <>
      <h4>Global historical surface temperature anomalies from January 1850 onwards</h4>
      <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" target="_blank" rel="noreferrer">Description and data source</a>
      <br></br>
      <h4>Northern Hemisphere 2,000-year temperature reconstruction</h4>
      <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank" rel="noreferrer">Data measurement description<br /></a>
      <a href="https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtemp-moberg2005.txt" target="_blank" rel="noreferrer">Data source<br /></a>
      <button onClick={() => setVisible(!visible)}>Change view</button>
      <button onClick={() => setV2Toggle(!v2Toggle)}>V2Toggle</button>
      <div style={{ width: 1500, height: 'auto', margin: 'auto' }}>
        <Line
          style={{ backgroundColor: "white" }}
          options={options}
          data={data}
        />
      </div>
    </>
  )
}

export default V1V2;
