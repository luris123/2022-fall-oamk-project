import React, { useState, useEffect } from 'react';
import {Chart} from 'chart.js';
import axios from 'axios'
const URL = "http://localhost:3001"

function Temperature() {
    const [tempTable, setTempTable] = useState([])

    //Paikat naille voi muuttua myohemmin...
    useEffect(() => {
      try {
        const response = axios.get(URL+"/datasets")
        .then((response) => {
          console.log(response.data.v1data[0].globalAnnual)
          setTempTable(response.data.v1data[0].globalAnnual.map(item=>item))
        });
      } catch (error) {
        console.log(error)
      }
    }, [])

    //Temporary test below will be changed to chart later on...
    return (
      <table>
      <h3>V1 Temperature Anomalies (this will be replaced with a chart...)</h3>
      <tbody>
          <tr>
              <th>time</th>
              <th>anomaly</th>
          </tr>
          {tempTable.map(p => (
          <tr key={p}>
              <td>{p.time}</td>
              <td>{p.anomaly}</td>
          </tr>
          ))}
      </tbody>
    </table>
    )
}

export default Temperature;

