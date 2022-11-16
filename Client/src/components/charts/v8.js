import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

function V8() {

  const [V8Years, setV8Years] = useState([]);
  const [V8Colors, setV8Colors] = useState([]);
  const [V8CountryNames, setV8CountryNames] = useState([]);
  const [V8CountrysCO2State, setV8CountrysCO2State] = useState([]);
  const [V8Dataset, setV8Dataset] = useState([]);

  useEffect(() => {
    try {
      chartService.getV8Data()
        .then((response) => {
          let TempYears = [1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
          let TempCountries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bonaire. Saint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Cook Islands","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","North Korea","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Faeroe Islands","Micronesia (Federated States of)","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Greenland","Grenada","Guadeloupe","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iraq","Ireland","Iran","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","North Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norway","Occupied Palestinian Territory","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Bolivia","Poland","Portugal","Qatar","Cameroon","South Korea","Moldova","South Sudan","Sudan","Réunion","Romania","Russian Federation","Rwanda","Saint Helena","Saint Lucia","Sint Maarten (Dutch part)","Samoa","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","Spain","Sri Lanka","Saint Kitts and Nevis","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","Tanzania","USA","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Wallis and Futuna Islands","Yemen","Zambia","Zimbabwe","KP Annex B","Non KP Annex B","OECD","Non-OECD","EU27","Africa","Asia","Central America","Europe","Middle East","North America","Oceania","South America","Bunkers","Statistical Difference","World"];
          let TempColors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenrod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","Firebrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","Goldenrod","Gray","Green","GreenYellow","Honeydew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenrodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquamarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenrod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Transparent","Turquoise","Violet","Wheat","WhiteSmoke","Yellow","YellowGreen"];
          let CountriesCO2 = [];
          let TemporaryCountry = [];
          
          //235 countries
          for (let k = 0; k < 10; k++) {
            if(TempCountries[k]!=("America"||"China")) {
              for (let i = 1959; i < 2020; i++) {
                TemporaryCountry.push(response[0][i][TempCountries[k]])
              }
              CountriesCO2.push(TemporaryCountry)
              TemporaryCountry = [];
            }
          }
          setV8Years(TempYears)
          setV8Colors(TempColors)
          setV8CountryNames(TempCountries)
          setV8CountrysCO2State(CountriesCO2)

          for (let k = 0; k < 10; k++) {
            TemporaryCountry.push(
              {
                label: V8CountryNames[k],
                data: V8CountrysCO2State[k],
                borderColor: V8Colors[k],
                backgroundColor: V8Colors[k],
                fill: true
              }
            )
          }
          setV8Dataset(TemporaryCountry)
        });
    } catch (error) {
      console.log(error)
    }
  }, []);

  

  const options = {
    //Only reacts to mousemove events
    events: ['mousemove'],

    responsive: true,
    scales: {
      y: {
        stacked:true,
        max: 1000,
      }
    },
    layout: {
        padding: 20
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
      <h3>V8 CO2 emissions by country</h3>
      <a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D">V8 Data source</a>
      <br></br>
      <a href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021">V8 description<br/></a>
      <Line
        style={{ backgroundColor: "white" }}
        options={options}
        data={{
          labels: V8Years,
          datasets: V8Dataset
        }}
      />
    </>
  )
}

export default V8;
