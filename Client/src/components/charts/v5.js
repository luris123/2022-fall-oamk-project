import React, { useState, useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../../css/App.css';
import Card from 'react-bootstrap/Card';
import { DatasetsContext } from '../../App.js';


Chart.register(...registerables);

function V5(props) {

  const datasets = useContext(DatasetsContext);

  const [airAge, setAirAge] = useState([]);
  const [co2Concentration, setCO2Concentration] = useState([]);

  useEffect(() => {
    if (datasets.length !== 0) {
        let AirAgeArray = datasets.v5data.map(x => x.mean_age_of_air_yr);
        setAirAge(AirAgeArray.reverse());

        let co2ConcentrationArray = datasets.v5data.map(x => x.c02_concentration);
        setCO2Concentration(co2ConcentrationArray.reverse());
    };
  }, [datasets]);

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
        text: "CO2 Concentration compared to the age of the air per year",
      },
    }
  };

  return (
    <>
      {props.show
        ? <Card id="card">
          <Card.Body id="card-header">
            <h3>V5 Vostok Air Core CO2 measurements, 417160 - 2342 years BP 2003</h3>
          </Card.Body>
          {props.description
            ? <p>{props.description}</p>
            : null
          }
          <div style={{ width: 600, Height: 600, margin: 'auto' }}>
            <Line
              style={{ backgroundColor: "white" }}
              options={options}
              data={{
                labels: airAge,
                datasets: [
                  {
                    label: "Concentration of CO2",
                    data: co2Concentration,
                    borderColor: 'black'
                  }
                ]
              }}
          />
        </div>
        <Card.Body id="card-header">
          <Card.Link href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.Aircore.co2">Data source</Card.Link>
          <Card.Link href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html">Data  description</Card.Link>
        </Card.Body>
        </Card>
        : null
      }
    </>
  )
}

export default V5;
