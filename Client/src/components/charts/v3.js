import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

function V3 () {

    const [annualYears3, setAnnualYears3] = useState([]);
    const [annualMean3, setAnnualMean3] = useState([]);
    const [monthlyYears3, setMonthlyYears3] = useState([]);
    const [monthlyMean3, setMonthlyMean3] = useState([]);
    const [dss, setDss] = useState([]);
    const [dssYears, setDssYears] = useState([]);
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        try {
            chartService.getV3Data()
            .then((response) => {
    
                let annualYears = response[0].annual.map( x => x.year);
                setAnnualYears3(annualYears);
    
                let annualMean = response[0].annual.map( x => x.mean);
                setAnnualMean3(annualMean);

                let monthlyYears = response[0].monthly.map( x => x.year);
                setMonthlyYears3(monthlyYears);

                let monthlyMean = response[0].monthly.map( x => x.monthlyAverage);
                setMonthlyMean3(monthlyMean);


    
            });

            chartService.getV4Data()
            .then((response) => {
    
                let dssYears = response[0].dss.map( x => x.year);
                setDssYears(dssYears.reverse());

                let dss = response[0].dss.map( x => x.c02MixingRatio);
                setDss(dss.reverse());

            });

    
        } catch (error) {
            console.log(error)
        }
        }, []);
        const options = {
            responsive: true,
            // events: [] makes the chart unresponsive to mouse events   
            events: ['mousemove'],
            scales: {
                x: {
                    //type: 'linear',


                },
                y: {
                    //type: 'linear',

                    }
                },
            
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Mauna Loa CO2 concentration measurements",
                },
            }
        };

        return (
            <>
            <h3>V3 Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958</h3>
            <a href="https://gml.noaa.gov/ccgg/trends/" target="_blank">Data source</a>
            <br></br>
            <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank">data measurement description<br/></a>
            <button onClick={() => setVisible(!visible)}>Change view</button>
            <Line
            style={{backgroundColor: "white"}}
                options={options}
                data={{
                    labels: annualYears3, monthlyYears3, dssYears,
                    datasets: [
                        {
                            label: "Annual Mean",
                            hidden: visible,
                            data: annualMean3,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                        {
                            label: "Monthly Mean-Average",
                            hidden: !visible,
                            data: monthlyMean3,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        // {
                        //     label: "DSS",
                        //     data: dss,
                        //     borderColor: 'rgb(255, 205, 86)',
                        //     backgroundColor: 'rgba(255, 205, 86, 0.5)',
                        // }
                    ]
                }}
            />
            </>
            
            
        )
}

export default V3;