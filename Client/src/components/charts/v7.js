import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';

Chart.register(...registerables);

function V7() {

    const [timeTemp1, setTimeTemp1] = useState([]);
    const [globalTemp1, setGlobalTemp1] = useState([]);
    const [timeCarbon1, setTimeCarbon1] = useState([]);
    const [carbon1, setCarbon1] = useState([]);

    useEffect(() => {
        try {
            chartService.getV7Data()
                .then((response) => {

                    let timeCarbon = response[0].carbon_dioxide.map(x => x.time_kyr_bp);
                    let carbon = response[0].carbon_dioxide.map(x => x.carbon_dioxide_ppm);
                    setTimeCarbon1(timeCarbon);
                    setCarbon1(carbon);

                    let timeTemp = response[0].gast_reconstruction.map(x => x.time_kyr_bp);
                    let globalTemp = response[0].gast_reconstruction.map(x => x.changes_global_tempature_c);
                    setTimeTemp1(timeTemp);
                    setGlobalTemp1(globalTemp);
                });

            /*chartService.getV6Data()
              .then((response) => {
                let v2DataYears = response.map(x => x.year);
                let v2DataTempature = response.map(x => x.t)
                setV2DataYears1(v2DataYears);
                setV2DataTempature1(v2DataTempature); 
      
              }); */

        } catch (error) {
            console.log(error)
        }
    }, []);

    const options = {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        layout: {
            padding: 50
        },
        scales: {
            y1: {
                position: 'right',
                title: {
                    display: true,
                    text: "Temperature (ºC)",
                    color: 'blue',
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                }
            },
            y2: {
                position: 'left',
                title: {
                    display: true,
                    text: "C02 ppm",
                    color: 'red',
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                }

            }
        }

    }

    return (
        <>
            <h3>V7 Evolution of global temperature over the past two million years</h3>
            <div style={{width: 2000, height: 1000, margin: 'auto'}}>
                <Line
                    style={{ backgroundColor: "white" }}
                    options={options}
                    data={{
                        labels: timeTemp1.reverse(),
                        datasets: [
                            {
                                label: "Change in global temperature (ºC)",
                                data: globalTemp1.reverse(),
                                showLine: true,
                                borderColor: 'blue',
                                yAxisID: 'y1',

                            },
                            {
                                if (globalTemp1) {
                                    console.log("tes");
                                },
                                label: "C02 measurements from the 800k year period",
                                data: carbon1.reverse(),
                                showLine: true,
                                borderColor: 'red',
                                yAxisID: 'y2',
                            }
                        ]
                    }}
                />
            </div>
        </>
    )
}

export default V7;