import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

Chart.register(...registerables);

function V7(props) {

    const [timeTemp1, setTimeTemp1] = useState([]);
    const [globalTemp1, setGlobalTemp1] = useState([]);
    const [timeCarbon1, setTimeCarbon1] = useState([]);
    const [carbon1, setCarbon1] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/datasets');
                let timeCarbon = response.data.v7data[0].carbon_dioxide.map(x => x.time_kyr_bp);
                let carbon = response.data.v7data[0].carbon_dioxide.map(x => x.carbon_dioxide_ppm);
                setTimeCarbon1(timeCarbon);
                setCarbon1(carbon);

                let timeTemp = response.data.v7data[0].gast_reconstruction.map(x => x.time_kyr_bp);
                let globalTemp = response.data.v7data[0].gast_reconstruction.map(x => x.changes_global_tempature_c);
                setTimeTemp1(timeTemp);
                setGlobalTemp1(globalTemp);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    const options = {
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Evolution of global temperature over the past two million years combined ",
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            y1: {
                position: 'right',
                min: -5,
                max: 15,
                title: {
                    display: true,
                    text: "Surface temperature change (ºC)",
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
                min: 100,
                max: 300,
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

            },
            x1: {
                reverse: true,
                type: "linear",
                title: {
                    display: true,
                    text: "Time (ka)",
                    color: 'black',
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                }
            },
        }

    };

    const data = {
        labels: timeTemp1,
        datasets: [
            {
                label: "Change in global temperature (ºC)",
                data: globalTemp1,
                showLine: true,
                borderColor: 'blue',
                borderWidth: 2,
                yAxisID: 'y1',
                xAxisID: 'x1'

            },
            {
                label: "C02 measurements from the 800k year period",
                data: carbon1,
                showLine: true,
                borderColor: 'red',
                borderWidth: 2,
                yAxisID: 'y2',
            },
        ]
    }

    return (
        <>
            {props.show
                ? <>
                    <h4>Ice core 800k year composite study CO2 measurements</h4>
                    <a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975" target="_blank" rel="noreferrer">Data description</a>
                    <br />
                    <a href="https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt" target="_blank" rel="noreferrer">Data source</a>
                    <p>TODO: Write a brief description of the graph and its information.</p>
                    <h4>Evolution of global temperature over the past two million years</h4>
                    <a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf" target="_blank" rel="noreferrer">Data description</a>
                    <br />
                    <a href="http://carolynsnyder.com/publications.php" target="_blank" rel="noreferrer">Data source</a>
                    <p>TODO: Write a brief description of the graph and its information.</p>
                    {props.description
                        ? <p>{props.description}</p>
                        : null
                    }
                    <div style={{ width: 'auto', height: 'auto', margin: 'auto' }}>
                        <Line
                            style={{ backgroundColor: "white" }}
                            options={options}
                            data={data}
                        />
                    </div>
                </>
                : null
            }

        </>
    )
}

export default V7;