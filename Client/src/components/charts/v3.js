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
                    text: "Mauna Loa CO2 concentration measurements",
                },
            }
        };

        return (

            <Line
            style={{backgroundColor: "white"}}
                options={options}
                data={{
                    labels: annualYears3,
                    datasets: [
                        {
                            label: "Annual Mean",
                            data: annualMean3,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        }
                    ]
                }}
            />
        )
}

export default V3;