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

        //wait for datasets
        if (datasets.length !== 0) {
            let carbon = datasets.v7data[0].carbon_dioxide.map(x => x.carbon_dioxide_ppm);
            setCarbon1(carbon);

            let timeTemp = datasets.v7data[0].gast_reconstruction.map(x => x.time_kyr_bp);
            //multiples timeTemp data by 1000 to get the correct time and adds - char to beginning of string
            timeTemp = timeTemp.map(x => x * 1000);
            timeTemp = timeTemp.map(x => "-" + x);

            let globalTemp = datasets.v7data[0].gast_reconstruction.map(x => x.changes_global_tempature_c);

            setTimeTemp1(timeTemp);
            setGlobalTemp1(globalTemp);

            let humanEvolution = datasets.v10data;

            //events that want to be shown on chart (indexes)
            let selectedEvents = [59, 61, 62, 64, 66, 69, 73, 77, 85, 121, 144, 598, 626];

            //selects only given indexes
            humanEvolution = humanEvolution.filter((x, index) => selectedEvents.includes(index));

            setHumanEvolution(humanEvolution);
        }

    }, [datasets]);

    //data for line chart
    const data = {
        labels: timeTemp1,
        datasets: [
            {
                type: 'line',
                label: "Lämpötila (ºC)",
                data: globalTemp1,
                borderColor: 'blue',
                borderWidth: 2,
                yAxisID: 'y1',
                xAxisID: 'x1'

            },
            {
                type: 'line',
                label: "C02",
                data: carbon1,
                borderColor: 'red',
                borderWidth: 2,
                yAxisID: 'y2',
            },
            {
                type: 'bubble',
                label: "Historia",
                data: humanEvolution1.map((x) => {
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

    //options for line chart
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (context) {
                        var title = context[0].dataset.title;
                        if (context[0].dataset.type === "bubble") {
                            title = "Vuosi: " + context[0].parsed.x;
                        }
                        else {
                            title = "Vuosi: " + context[0].label;
                        }
                        return title;
                    },
                    label: function (context) {
                        var label = context.dataset.label;
                        if (context.dataset.type === "bubble") {
                            label = context.raw.description;
                        }
                        else {
                            label = label + ": " + context.formattedValue;
                        }
                        return label;
                    }
                },
            },
            legend: {
                position: "top",
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
                    text: "Pinnan lämpötila muutos (ºC)",
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
                    text: "Aika, 2 miljoonaa vuotta sitten - 2022",
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
            <Card>
                <Card.Body className='text-center'>
                    <Card.Title>Maailman lämpötilan muutos 2 miljoonan vuoden ajalta <br />& <br />Jään C02 pitoisuuden mittaus 800t vuoden ajalta</Card.Title>
                    <Chart
                        type='line'
                        options={options}
                        data={data}
                        className='chart'
                    />
                    {props.description
                        ? <Card.Text>{props.description}</Card.Text>
                        : <Card.Text>Kuvaajassa näkyy maailman lämpötilan muutos 2 miljoonan vuoden
                            ajalta yhdistettynä jään C02 pitoisuuden mittaukseen 800t vuoden ajalta.
                            Lisäksi kuvaajassa näkyy myös evoluution ja historian merkittäviä tapahtumia.
                        </Card.Text>
                    }
                    <Card.Link href="http://carolynsnyder.com/publications.php" >Lämpötilan muutos - datan lähde</Card.Link>
                    <Card.Link href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf">Lämpötilan muutos- datan kuvaus</Card.Link>
                    <Card.Link href="https://www.ncei.noaa.gov/access/paleo-search/study/17975" >C02 - datan kuvaus</Card.Link>
                    <Card.Link href="https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt" >C02 - datan lähde</Card.Link>
                    <Card.Link href="https://www.southampton.ac.uk/~cpd/history.html" >Historia - datan lähde</Card.Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default V7;