import React, { useState, useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import { DatasetsContext } from '../../App.js';

Chart.register(...registerables);

function V7(props) {

    const datasets = useContext(DatasetsContext);

    const [timeTemp1, setTimeTemp1] = useState([]);
    const [globalTemp1, setGlobalTemp1] = useState([]);
    const [timeCarbon1, setTimeCarbon1] = useState([]);
    const [carbon1, setCarbon1] = useState([]);

    useEffect(() => {
        if (datasets.length !== 0) {
            let timeCarbon = datasets.v7data[0].carbon_dioxide.map(x => x.time_kyr_bp);
            let carbon = datasets.v7data[0].carbon_dioxide.map(x => x.carbon_dioxide_ppm);
            setTimeCarbon1(timeCarbon);
            setCarbon1(carbon);

            let timeTemp = datasets.v7data[0].gast_reconstruction.map(x => x.time_kyr_bp);
            let globalTemp = datasets.v7data[0].gast_reconstruction.map(x => x.changes_global_tempature_c);
            setTimeTemp1(timeTemp);
            setGlobalTemp1(globalTemp);
        }

    }, [datasets]);

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
                        size: 12,
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
                        size: 12,
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
                        size: 12,
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
                ? <Card id="card">
                    <Card.Body id="card-header">
                        <h4>Evolution of global temperature over the past two million years</h4>
                        <p>TODO: Write a brief description of the graph and its information.</p>
                    </Card.Body>

                    {props.description
                        ? <p>{props.description}</p>
                        : null
                    }
                    <div style={{ width: 'auto', height: 'auto'}}>
                        <Line
                            style={{ backgroundColor: "white" }}
                            options={options}
                            data={data}
                        />
                    </div>
                    <Card.Body id="card-header">
                        <Card.Link href="http://carolynsnyder.com/publications.php" >Data description</Card.Link>
                        <Card.Link href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf">Data source</Card.Link>
                    </Card.Body>
                </Card>
                : null
            }

        </>
    )
}

export default V7;