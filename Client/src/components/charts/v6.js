import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

Chart.register(...registerables);

function V6(props) {

  const [icesAgeV6, setIcesAgeV6] = useState([]);
  const [co2ppmV6, setCO2ppmV6] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/datasets');

        let iceAgeArrayV6 = response.data.v6data.map(x => x.age_before_present);
        setIcesAgeV6(iceAgeArrayV6.reverse());
        
        for (let i = 0; i < iceAgeArrayV6.length; i++) {
          iceAgeArrayV6[i] = parseInt(iceAgeArrayV6[i], 10);
        }


        let co2ppmArrayV6 = response.data.v6data.map(x => x.c02_ppm);
        setCO2ppmV6(co2ppmArrayV6.reverse());

      } catch (error) {
        console.log(error);
      }
    };
    getData();
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
      {props.show
        ? <Card id="card">
          <Card.Body id="card-header">
            <h3>V6 Ice core 800k year composite study CO2 measurements</h3>
          </Card.Body>
          {props.description
            ? <p>{props.description}</p>
            : null
          }
          <div style={{ width: 'auto', height: 'auto', margin: 'auto' }}>
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
          </div>
          <Card.Body id="card-header">
            <Card.Link href="https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt">Data source</Card.Link>
            <Card.Link href="https://www.ncei.noaa.gov/access/paleo-search/study/17975" >Data  description</Card.Link>
          </Card.Body>
        </Card>
        : null
      }

    </>
  )
}

export default V6;
