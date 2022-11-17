import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';


Chart.register(...registerables);

const dataTesti = {
  globalAnnual: [
    {
        "time": "1900",
        "anomaly": "200"  
    },
    {
        "time": "1901",
        "anomaly": "204"  
    },
    {
        "time": "1902",
        "anomaly": "208"  
    },
    {
        "time": "1903",
        "anomaly": "239"  
    },
    {
        "time": "1904",
        "anomaly": "212"  
    },
    {
        "time": "1905",
        "anomaly": "276"  
    },
    {
        "time": "1906",
        "anomaly": "201"  
    }
]
};

function V1V2() {

  const [v1Data, setV1Data] = useState([]);
  const [v2Data, setV2Data] = useState([]);

  const [visible, setVisible] = useState(false);
  const [v2Toggle, setV2Toggle] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/datasets');

        for(let i = 0; i < response.data.v1data[0].globalAnnual.length; i++){
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

        for(let i = 0; i < response.data.v2data.length; i++){
          response.data.v2data[i].year = response.data.v2data[i].year.toString();
          response.data.v2data[i].t = response.data.v2data[i].t.toString(); 
        }


        console.log(response.data.v1data[0].globalAnnual.length);

        for(let j = 1980; j <= 2023; j++){
          response.data.v2data[j] = {
            "year": null,
            "t": null
          }
        }
        
        console.log(response.data.v2data);
        setV1Data(response.data.v1data[0]);
        setV2Data(response.data.v2data);
      
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const options = {
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
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: visible
      },
      {
        label: "Northern Annual",
        data: v1Data.northernAnnual,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: visible
      },
      {
        label: "Southern Annual",
        data: v1Data.southernAnnual,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: visible
      },
      {
        label: "Global Monthly",
        data: v1Data.globalMonthly,
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: !visible
      },
      {
        label: "Northern Monthly",
        data: v1Data.northernMonthly,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: !visible
      },
      {
        label: "Southern Monthly",
        data: v1Data.southernMonthly,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'anomaly'
        },
        hidden: !visible
      },
      {
        label: "testi",
        data: v2Data,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1,
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
      <h3>V1 Global historical surface temperature anomalies from January 1850 onwards<br />V2 Northern Hemisphere 2,000-year temperature reconstruction</h3>
      <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" target="_blank" rel="noreferrer">V1 Data source</a>
      <br></br>
      <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank" rel="noreferrer">V2 Data measurement description<br /></a>
      <button onClick={() => setVisible(!visible)}>Change view</button>
      <button onClick={() => setV2Toggle(!v2Toggle)}>V2Toggle</button>
      <Line
        style={{ backgroundColor: "white" }}
        options={options}
        data={data}
      />
    </>
  )
}

export default V1V2;
