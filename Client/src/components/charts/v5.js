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
    interaction: {
      mode: 'nearest',
      intersect: false,
  },
  elements: {
      point: {
          radius: 0
      }
  },

    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Vuosittainen CO2 pitoisuus verrattuna ilman ikään",
      },
    }
  };

  return (
    <>
      <Card>
        <Card.Body className='text-center'>
          <Card.Title>Vostokin ilman ytimen C02 mittaukset, vuodesta 415157 BC vuoteen 339 BC</Card.Title>
          {props.description
            ? <p>{props.description}</p>
            : null
          }
          <Line
            className='chart'
            options={options}
            data={{
              labels: airAge,
              datasets: [
                {
                  label: "CO2 pitoisuus",
                  data: co2Concentration,
                  borderColor: 'black'
                }
              ]
            }}
          />
          <Card.Link href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.Aircore.co2">Datan lähde</Card.Link>
          <Card.Link href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html">Datan kuvaus</Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default V5;
