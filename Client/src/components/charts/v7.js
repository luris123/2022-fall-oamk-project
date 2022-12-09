import React, { useState, useEffect, useContext, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import { DatasetsContext } from '../../App.js';

ChartJS.register(...registerables);

function V7(props) {

    const datasets = useContext(DatasetsContext);

    const [timeTemp1, setTimeTemp1] = useState([]);
    const [globalTemp1, setGlobalTemp1] = useState([]);
    const [carbon1, setCarbon1] = useState([]);
    const [humanEvolution1, setHumanEvolution] = useState([]);

    useEffect(() => {
        if (datasets.length !== 0) {
            let carbon = datasets.v7data[0].carbon_dioxide.map(x => x.carbon_dioxide_ppm);
            setCarbon1(carbon);

            let timeTemp = datasets.v7data[0].gast_reconstruction.map(x => x.time_kyr_bp);
            //multiple timeTemp data by 1000 to get the correct time and add - char to beginning of string
            timeTemp = timeTemp.map(x => x * 1000);
            timeTemp = timeTemp.map(x => "-" + x);

            let globalTemp = datasets.v7data[0].gast_reconstruction.map(x => x.changes_global_tempature_c);
            
            setTimeTemp1(timeTemp);
            setGlobalTemp1(globalTemp);

            let humanEvolution = datasets.v10data;

            //events that want to be shown on chart
            let selectedEvents = [59, 61, 62, 64, 66, 69, 73, 77, 85, 121, 144, 598, 626];

            //selects only given indexes
            humanEvolution = humanEvolution.filter((x, index) => selectedEvents.includes(index));

            //shows only events before 0
            humanEvolution = humanEvolution.filter(x => x.year < 2022);

            setHumanEvolution(humanEvolution);
        }

    }, [datasets]);

    const data = {
        labels: timeTemp1,
        datasets: [
            {
                type: 'line',
                label: "Change in global temperature (ºC)",
                data: globalTemp1,
                borderColor: 'blue',
                borderWidth: 2,
                yAxisID: 'y1',
                xAxisID: 'x1'

            },
            {
                type: 'line',
                label: "C02 measurements from the 800k year period",
                data: carbon1,
                borderColor: 'red',
                borderWidth: 2,
                yAxisID: 'y2',
            },
            {
                type: 'bubble',
                label: "History",
                data: humanEvolution1.map((x) =>{
                    return {
                        x: x.year,
                        y: 4,
                        r: 5,
                        description: x.description,
                    }
                }),
                borderColor: 'orange',
                borderWidth: 2,
            }
        ]
    }

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (context) {
                        var title = context[0].dataset.title;
                        if(context[0].dataset.type === "bubble"){
                            title = "Year: " + context[0].parsed.x;
                        }
                        else{
                            title = "Year: " + context[0].label;
                        }
                        return title;
                    },
                    label: function (context) {
                        var label = context.dataset.label;
                        if(context.dataset.type === "bubble"){
                            label = context.raw.description;
                        }
                        else{
                            label = label + ": " + context.formattedValue;
                        }
                        return label;
                    }
                },
            },
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Evolution of global temperature over the past two million years combined with Ice core 800k year composite study CO2 measurements",
            },
            
        },
        interaction: {
            mode: 'nearest',
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
                type: "linear",
                title: {
                    display: true,
                    text: "Time, 2 million years ago to present",
                    color: 'black',
                    font: {
                        size: 12,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
                max: 2022,
            },
        }

    };


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
                    <div style={{ width: 'auto', height: 'auto' }}>

                        <Chart
                            type='line'
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