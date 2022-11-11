import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

function V1() {

  const [globalAnnualYears1, setGlobalAnnualYears1] = useState([]);
  const [globalAnnualyAnomaly1, setGlobalAnnualAnomaly1] = useState([]);

    useEffect(() => {
        try {
            chartService.getV1Data()
            .then((response) => {
    
                let globalAnnualYears = response[0].globalAnnual.map( x => x.time);
                setGlobalAnnualYears1(globalAnnualYears);
    
                let globalAnnualAnomaly = response[0].globalAnnual.map( x => x.anomaly);
                setGlobalAnnualAnomaly1(globalAnnualAnomaly);
    
            });
    
        } catch (error) {
            console.log(error)
        }
        }, []);
        const options = {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Temperature Anomalies from 1850",
              },
            }
          };
        
        
          //Temporary test below will be changed to chart later on...
          return (
            <div>
              <h3>V1 Temperature Anomalies (this will be replaced with a chart...)</h3>
              <Line
              style={{backgroundColor: "white"}}
                options={options}
                data={{
                  labels: globalAnnualYears1,
                  datasets: [
                    {
                      label: "Global Annual",
                      data: globalAnnualyAnomaly1,
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }
                  ]
                }}
              />
            </div>
        
          )
        }
        
        export default V1;
        