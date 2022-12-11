import React, { useState, useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import { DatasetsContext } from '../../App.js';

Chart.register(...registerables);

function V6(props) {

  const datasets = useContext(DatasetsContext);

  const [icesAgeV6, setIcesAgeV6] = useState([]);
  const [co2ppmV6, setCO2ppmV6] = useState([]);

  useEffect(() => {
    if (datasets.length !== 0) {

      let iceAgeArrayV6 = datasets.v6data.map(x => x.age_before_present);
      setIcesAgeV6(iceAgeArrayV6.reverse());

      for (let i = 0; i < iceAgeArrayV6.length; i++) {
        iceAgeArrayV6[i] = parseInt(iceAgeArrayV6[i], 10);
      }

      let co2ppmArrayV6 = datasets.v6data.map(x => x.c02_ppm);
      setCO2ppmV6(co2ppmArrayV6.reverse());
    };
  }, [datasets]);

  const options = {
    //Only reacts to mousemove events
    events: ['mousemove'],
    elements: {
      point: {
        radius: 0
      }
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    }
  };

  return (
    <>
      <Card>
        <Card.Body className='text-center'>
          <Card.Title>Jään C02 pitoisuuden mittaus 800t vuoden ajalta</Card.Title>
          {props.description
            ? <p>{props.description}</p>
            : null
          }
          <Line
            className='chart'
            options={options}
            data={{
              labels: icesAgeV6,
              datasets: [
                {
                  label: "C02 ppm",
                  data: co2ppmV6,
                  borderColor: 'black'
                }
              ]
            }}
          />
          <Card.Text>Kuvaajassa näkyy jään C02 pitoisuudet 800t vuoden ajalta. Data on kerätty eri osista Etelämannerta.</Card.Text>
          <Card.Link href="https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt">Datan lähde</Card.Link>
          <Card.Link href="https://www.ncei.noaa.gov/access/paleo-search/study/17975" >Datan kuvaus</Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default V6;
