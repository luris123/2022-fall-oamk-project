import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

function V8() {

  const [globalCo2Years, setGlobalCo2Years] = useState([]);
  const [CountryFinland, setCountryFinland] = useState([]);
  const [CountryGermany, setCountryGermany] = useState([]);

  useEffect(() => {
    try {
      chartService.getV8Data()
        .then((response) => {
          let yearsCo2V8 = [1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
          let finland = [];
          let germany = [];
          
          for (let i = 1957; i < 2020; i++) {
            const k = i
            finland.push(response[0].k.Finland)
            germany.push(response[0].k.Finland)
          }
          setGlobalCo2Years(yearsCo2V8)
          setCountryFinland(finland)
          setCountryGermany(germany)

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
        text: "V8 CO2 emissions by country",
      },
    }
  };

  return (
    <>
      <h3>V8 CO2 emissions by country</h3>
      <a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D" target="_blank">V8 Data source</a>
      <br></br>
      <a href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021" target="_blank">V8 description<br/></a>
      <Line
        style={{ backgroundColor: "white" }}
        options={options}
        data={{
          labels: globalCo2Years,
          datasets: [
            {
              label: "Finland",
              data: CountryFinland,
              borderColor: 'black',
            },
            {
              label: "Germany",
              data: CountryGermany,
              borderColor: 'black',
            }
          ]
        }}
      />
    </>
  )
}

export default V8;
