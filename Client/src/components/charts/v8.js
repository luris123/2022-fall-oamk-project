import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios'
import randomColor from "randomcolor";

Chart.register(...registerables);

function V8(props) {

  const [V8Years, setV8Years] = useState([]);
  const [V8Dataset, setV8Dataset] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/datasets');

        let TempYears = [];
        let TempCountries = response.data.v8data[1].countries;
        let CountriesCO2 = [];
        let TempCountryCO2 = []

        for (let s = 0; s < 219; s++) {
          TempYears = []
          for (let i = 1959; i < 2021; i++) {
            TempCountryCO2.push(response.data.v8data[0][i][TempCountries[s]])
            TempYears.push(i)
          }
          CountriesCO2.push(TempCountryCO2)
          TempCountryCO2 = []
        }

        for (let u = 0; u < 219; u++) {
          let randomcolor = randomColor()
          TempCountryCO2.push(
            {
              label: TempCountries[u],
              data: CountriesCO2[u],
              borderColor: randomcolor,
              backgroundColor: randomcolor,
              fill: false
            }
          )
        }
        setV8Dataset(TempCountryCO2);
        setV8Years(TempYears);

      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);




  const options = {
    //Only reacts to mousemove events
    interaction: {
      mode: 'point',
      intersect: false,
      //hitRadius: 50,
    },

    responsive: true,
    scales: {
      y: {
        stacked: true,
        //max: 1000,
      }
    },
    layout: {
      padding: 2
    },
    elements: {
        point: {
            radius: 0
        }
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "V8 CO2 emissions by country",
      },
    }
  };

  return (
    <>
      {props.show
        ? <div>
          <h3>V8 CO2 emissions by country</h3>
          <a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D">V8 Data source</a>
          <br></br>
          <a href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021">V8 description<br /></a>
          {props.description
            ? <p>{props.description}</p>
            : null
          }
          <Line
            style={{ backgroundColor: "white" }}
            options={options}
            data={{
              labels: V8Years,
              datasets: V8Dataset
            }}
          />
        </div>
        : null
      }

    </>
  )
}

export default V8;
