import React, { useState, useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import randomColor from "randomcolor";
import { DatasetsContext } from '../../App.js';

Chart.register(...registerables);

function V8(props) {

  const datasets = useContext(DatasetsContext);

  const [V8Years, setV8Years] = useState([]);
  const [V8Dataset, setV8Dataset] = useState([]);

  useEffect(() => {
    if (datasets.length !== 0) {
        let TempYears = [];
        let TempCountries = datasets.v8data[1].countries;
        let CountriesCO2 = [];
        let TempCountryCO2 = []

        for (let s = 0; s < 219; s++) {
          TempYears = []
          for (let i = 1959; i < 2021; i++) {
            TempCountryCO2.push(datasets.v8data[0][i][TempCountries[s]])
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

      }
  }, [datasets]);




  const options = {
    //Only reacts to mousemove events
    interaction: {
      mode: 'point',
      intersect: false,
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
