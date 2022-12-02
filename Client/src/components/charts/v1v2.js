import '../../css/App.css'
import React, { useState, useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { DatasetsContext } from '../../App.js';


Chart.register(...registerables);

function V1V2(props) {

  const datasets = useContext(DatasetsContext);

  const [v1Data, setV1Data] = useState([]);
  const [v2Data, setV2Data] = useState([]);
  const [visible, setVisible] = useState(false);
  const [v2Toggle, setV2Toggle] = useState(true);

  useEffect(() => {
    if (datasets.length !== 0) {
      
      for (let i = 0; i < datasets.v1data[0].globalAnnual.length; i++) {
        datasets.v1data[0].globalAnnual[i].time = datasets.v1data[0].globalAnnual[i].time.toString();
        datasets.v1data[0].globalAnnual[i].anomaly = datasets.v1data[0].globalAnnual[i].anomaly.toString();

        datasets.v1data[0].globalMonthly[i].time = datasets.v1data[0].globalMonthly[i].time.toString();
        datasets.v1data[0].globalMonthly[i].anomaly = datasets.v1data[0].globalMonthly[i].anomaly.toString();

        datasets.v1data[0].northernAnnual[i].time = datasets.v1data[0].northernAnnual[i].time.toString();
        datasets.v1data[0].northernAnnual[i].anomaly = datasets.v1data[0].northernAnnual[i].anomaly.toString();

        datasets.v1data[0].northernMonthly[i].time = datasets.v1data[0].northernMonthly[i].time.toString();
        datasets.v1data[0].northernMonthly[i].anomaly = datasets.v1data[0].northernMonthly[i].anomaly.toString();

        datasets.v1data[0].southernAnnual[i].time = datasets.v1data[0].southernAnnual[i].time.toString();
        datasets.v1data[0].southernAnnual[i].anomaly = datasets.v1data[0].southernAnnual[i].anomaly.toString();

        datasets.v1data[0].southernMonthly[i].time = datasets.v1data[0].southernMonthly[i].time.toString();
        datasets.v1data[0].southernMonthly[i].anomaly = datasets.v1data[0].southernMonthly[i].anomaly.toString();
      }

      for (let i = 0; i < datasets.v2data.length; i++) {
        datasets.v2data[i].year = datasets.v2data[i].year.toString();
        datasets.v2data[i].t = datasets.v2data[i].t.toString();
      }

      setV1Data(datasets.v1data[0]);
      setV2Data(datasets.v2data);
    }
  }, [datasets]);


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
      {props.show
        ? <Card id="card">
          <Card.Body id="card-header">
            <h3>Global historical surface temperature anomalies from January 1850 onwards<br></br>&<br></br>Northern Hemisphere 2,000-year temperature reconstruction</h3>
          </Card.Body>
          <Card.Body id="card-header">
            <Button id="view-button" onClick={() => setVisible(!visible)}>Change view</Button>
            <Button id="view-button" onClick={() => setV2Toggle(!v2Toggle)}>V2Toggle</Button>
          </Card.Body>
          {props.description
            ? <p>{props.description}</p>
            : null
          }
          <div style={{ width: 1000, height: '1500', margin: 'auto' }}>
            <Line
              style={{ backgroundColor: "white" }}
              options={options}
              data={data}
            />
          </div>
          <Card.Body id="card-header">
            <Card.Link href="https://www.metoffice.gov.uk/hadobs/hadcrut5/">Global surface temperature Description and Data source</Card.Link>
            <Card.Link href="https://gml.noaa.gov/ccgg/about/co2_measurements.html">Data measurement description</Card.Link>
            <Card.Link href="https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtemp-moberg2005.txt">Northern Hemisphere temperature Data source</Card.Link>
          </Card.Body>
        </Card>
        : null
      }
    </>
  )
}

export default V1V2;
