import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

Chart.register(...registerables);

function V3 () {

    const [annual, setAnnual] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [dss, setDss] = useState([]);
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        try {
            chartService.getV3Data()
            .then((response) => {
    
                let annual = response[0].annual
                setAnnual(annual)
                //change values inside annual to strings
                for (let i = 0; i < annual.length; i++) {
                    annual[i].year = annual[i].year.toString();
                    annual[i].mean = annual[i].mean.toString();
                }

                let monthly = response[0].monthly
                setMonthly(monthly);

                for (let i = 0; i < monthly.length; i++) {
                    monthly[i].year = monthly[i].year.toString();
                    monthly[i].average = monthly[i].average.toString();

                }


    
            });

            chartService.getV4Data()
            .then((response) => {
    
                let dss = response[0].dss
                setDss(dss.reverse());

                for (let i = 0; i < dss.length; i++) {
                    dss[i].year = dss[i].year.toString();
                    dss[i].c02MixingRatio = dss[i].c02MixingRatio.toString();
                }


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
                    type: 'time',
                    time: {
                        unit: 'year',
                    },
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },

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

        const data = {
            datasets: [
                {
                    label: 'Annual mean',
                    data: annual,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    parsing:{
                        xAxisKey: 'year',
                        yAxisKey: 'mean'
                    }
                    
                },
                {
                    label: 'Monthly mean',
                    data: monthly,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    parsing:{
                        xAxisKey: 'year',
                        yAxisKey: 'average'
                    }
                },
                // {
                //     label: 'DSS',
                //     data: dss,
                //     borderColor: 'rgb(75, 192, 192)',
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     parsing:{
                //         xAxisKey: 'year',
                //         yAxisKey: 'c02MixingRatio'
                //     }

                // }
            ],

        }

        return (
            <>
            <h3>V3 Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958</h3>
            <a href="https://gml.noaa.gov/ccgg/trends/" target="_blank" rel="noreferrer">Data source</a>
            <br></br>
            <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank" rel="noreferrer">data measurement description<br/></a>
            <button onClick={() => setVisible(!visible)}>Change view</button>
            {console.log(data)}
            <div>
            <Line
            style={{backgroundColor: "white"}}
                options={options}
                data={data}
            />
            </div>
            </>
            
            
        )
}

export default V3;