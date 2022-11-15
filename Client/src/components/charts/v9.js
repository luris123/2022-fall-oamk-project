import React, { useState, useEffect, useRef } from 'react';
import chartService from '../../services/chartService';
import Energy from './v9helpers/energy';
import Industrial from './v9helpers/industrial';
import Agriculture from './v9helpers/agriculture';
import Waste from './v9helpers/waste';
import { Chart, registerables } from 'chart.js';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

Chart.register(...registerables);

function V9 () {

    const [sector, setSector] = useState([]);
    const [sectorShare, setSectorShare] = useState([]);
    const [subSector, setSubSector] = useState([]);
    const [subSectorShare, setSubSectorShare] = useState([]);
    const [subSectorFurtherBreakdown , setSubSectorFurtherBreakdown] = useState([]);
    const [subSectorFurtherBreakdownShare, setSubSectorFurtherBreakdownShare] = useState([]);
    const [openEnergy, setOpenEnergy] = useState(false);
    const [openIndustrial, setOpenIndustrial] = useState(false);
    const [openAgriculture, setOpenAgriculture] = useState(false);
    const [openWaste, setOpenWaste] = useState(false);
    
    
    const chartRef = useRef();

    const closeModal = () => {
        setOpenEnergy(false);
        setOpenIndustrial(false);
        setOpenAgriculture(false);
        setOpenWaste(false);
    }
    const onClick = (event) => {
        let element = getElementAtEvent(chartRef.current, event)

        if(element[0].index === 0) {
            setOpenEnergy(true);
        } else if (element[0].index === 1) {
            setOpenIndustrial(true);
        } else if (element[0].index === 2) {
            setOpenWaste(true);
        } else if (element[0].index === 3) {
            setOpenAgriculture(true);
        }
    }

    useEffect(() => {
        try {
            chartService.getV9Data()
            .then((response) => {

                let sector = response[0].sector.map( x => x.sector);
                setSector(sector);
                let sectorShare = response[0].sector.map( x => x.share_of_global_greenhouse_gas_emissions_percentage);
                setSectorShare(sectorShare);

                let subSector = response[0].sub_sector.map( x => x.sub_sector);
                setSubSector(subSector);
                let subSectorShare = response[0].sub_sector.map( x => x.share_of_global_greenhouse_gas_emissions_percentage);
                setSubSectorShare(subSectorShare);

                let subSectorFurtherBreakdown = response[0].sub_sector_further_breakdown.map( x => x.sub_sector);
                setSubSectorFurtherBreakdown(subSectorFurtherBreakdown);
                let subSectorFurtherBreakdownShare = response[0].sub_sector_further_breakdown.map( x => x.share_of_global_greenhouse_gas_emissions_percentage);
                setSubSectorFurtherBreakdownShare(subSectorFurtherBreakdownShare);

            });

        } catch (error) {
            console.log(error)
        }
        }, []);

    const options = {
        
        responsive: true,
        maintainAspectRatio: true,
        // events: [] makes the chart unresponsive to mouse events   
        events: ['mousemove'],        
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "CO2 emissions by sectors",
            },
        }
    };

    return (
        <>
        <h3>V9 CO2 emissions by sectors</h3>
        <a href='https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D'>Data source</a>
        <br></br>
        <a href='https://essd.copernicus.org/articles/14/1917/2022/'>Data description</a>
        <Popup contentStyle={{width: 1138}} open={openEnergy} closeOnDocumentClick onClose={closeModal}>
            <Energy subSector={subSector} subSectorShare={subSectorShare} subSectorFurtherBreakdown={subSectorFurtherBreakdown} 
            subSectorFurtherBreakdownShare={subSectorFurtherBreakdownShare}/>
        </Popup>

        <Popup open={openIndustrial} closeOnDocumentClick onClose={closeModal}>
            <Industrial subSector={subSector} subSectorShare={subSectorShare} />
        </Popup>

        <Popup open={openAgriculture} closeOnDocumentClick onClose={closeModal}>
            <Agriculture subSector={subSector} subSectorShare={subSectorShare} />
        </Popup>

        <Popup open={openWaste} closeOnDocumentClick onClose={closeModal}>
            <Waste subSector={subSector} subSectorShare={subSectorShare} />
        </Popup>

        <div style={{width: 1000, height: 1000, margin: "auto"}}>
        <Doughnut
        style={{height: "50%", width: "50%"}}
            options={options}
            ref={chartRef}
            data={{
                labels: sector,
                datasets: [{
                    data: sectorShare,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                    ],
                    hoverOffset: 4,
                    weight: 100
                }],
                
            }}
            onClick={onClick}

        
            />
            </div>
        </>
    )

}

export default V9