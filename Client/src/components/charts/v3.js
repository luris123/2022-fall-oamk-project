import React, { useState, useEffect } from 'react';
import chartService from '../../services/chartService';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

Chart.register(...registerables);

function V3 () {

    const [annual, setAnnual] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [de08, setDe08] = useState([]);
    const [de082, setDe082] = useState([]);
    const [dss, setDss] = useState([]);
    const [v10, setV10] = useState([]);
    const [visible, setVisible] = useState(false);
    const [v4Toggle, setV4Toggle] = useState(true);
    const [v10Toggle, setV10Toggle] = useState(true);


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

                let de08 = response[0].de08
                setDe08(de08.reverse());

                for (let i = 0; i < de08.length; i++) {
                    de08[i].year = de08[i].year.toString();
                    de08[i].c02MixingRatio = de08[i].c02MixingRatio.toString();
                }

                let de082 = response[0].de082
                setDe082(de082.reverse());

                for (let i = 0; i < de082.length; i++) {
                    de082[i].year = de082[i].year.toString();
                    de082[i].c02MixingRatio = de082[i].c02MixingRatio.toString();
                }
    
                let dss = response[0].dss
                setDss(dss.reverse());

                for (let i = 0; i < dss.length; i++) {
                    dss[i].year = dss[i].year.toString();
                    dss[i].c02MixingRatio = dss[i].c02MixingRatio.toString();
                }


            });

            chartService.getV10Data()
            .then((response) => {

                let v10 = response
                setV10(v10);
                
                for (let i = 0; i < v10.length; i++) {
                    v10[i].year = v10[i].year.toString();
                    v10[i].description = v10[i].description.toString();
                }

                setV10(v10.slice(344));
                

            })

    
        } catch (error) {
            console.log(error)
        }
        }, []);
        const options = {
            // events: [] makes the chart unresponsive to mouse events   
            events: ['mousemove'],
            responsive: true,
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
                    hidden: visible,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    parsing:{
                        xAxisKey: 'year',
                        yAxisKey: 'mean'
                    }
                    
                },
                {
                    label: 'Monthly mean average',
                    data: monthly,
                    hidden: !visible,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    parsing:{
                        xAxisKey: 'year',
                        yAxisKey: 'average'
                    }
                },
                {
                    label: 'DE08',
                    data: de08,
                    hidden: v4Toggle,
                    borderColor: 'rgb(255, 205, 86)',
                    backgroundColor: 'rgba(255, 205, 86, 0.5)',
                    parsing:{
                        xAxisKey: 'year',
                        yAxisKey: 'c02MixingRatio'
                    }
                },
                {
                    label: 'DE082',
                    data: de082,
                    hidden: v4Toggle,
                    borderColor: 'rgb(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    parsing:{
                        xAxisKey: 'year',
                        yAxisKey: 'c02MixingRatio'
                    }
                },
                {
                    label: 'DSS',
                    data: dss,
                    hidden: v4Toggle,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    parsing:{
                        xAxisKey: 'year',
                        yAxisKey: 'c02MixingRatio'
                    }

                },
                // {
                //     label: 'Major historical events',
                //     data: v10,
                //     hidden: v10Toggle,
                //     borderColor: 'rgb(50, 205, 50)',
                //     backgroundColor: 'rgba(50, 205, 50, 0.5)',
                //     parsing:{
                //         xAxisKey: 'year',
                //     }
                // },
            ],

        }

        return (
            <>
            <h3>V3 Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958</h3>
            <a href="https://gml.noaa.gov/ccgg/trends/" target="_blank" rel="noreferrer">Data source</a>
            <br></br>
            <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank" rel="noreferrer">data measurement description<br/></a>
            <button onClick={() => setVisible(!visible)}>Change view</button>
            <button onClick={() => setV4Toggle(!v4Toggle)}>Toggle V4</button>
            <button onClick={() => setV10Toggle(!v10Toggle)}>Toggle V10</button>
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