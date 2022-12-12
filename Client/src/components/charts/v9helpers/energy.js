import React, { useState } from 'react';
import Popup from "reactjs-popup"
import Button from "react-bootstrap/Button";
import '../../../css/v9helper.css'
import Card from 'react-bootstrap/Card';
import Transport from './energyhelpers/transport';
import EnergyInBuildings from './energyhelpers/energyInBuildings';
import EnergyInIndustry from './energyhelpers/energyInIndustry';
import EnergyInAgri from './energyhelpers/energyInAgri';
import UnallocatedFuelCombustion from './energyhelpers/unallocatedFuelCombustion';
import FugitiveEmissionsFromEnergy from './energyhelpers/fugitiveEmissionsFromEnergy';

function Energy ({subSector, subSectorShare, subSectorFurtherBreakdown, subSectorFurtherBreakdownShare}) {

    const [openTransport, setOpenTransport] = useState(false);
    const [openEnergyInBuildings, setOpenEnergyInBuildings] = useState(false);
    const [openEnergyInIndustry, setOpenEnergyInIndustry] = useState(false);
    const [openEnergyInAgri, setOpenEnergyInAgri] = useState(false);
    const [openUnallocatedFuelCombustion, setOpenUnallocatedFuelCombustion] = useState(false);
    const [openFugitiveEmissionsFromEnergy, setOpenFugitiveEmissionsFromEnergy] = useState(false);

    let subSectorData = subSector.map((x, i) => {
        return {subSector: x, subSectorShare: subSectorShare[i]}
    })

    const closeModal = () => {
        setOpenTransport(false);
        setOpenEnergyInBuildings(false);
        setOpenEnergyInIndustry(false);
        setOpenEnergyInAgri(false);
        setOpenUnallocatedFuelCombustion(false);
        setOpenFugitiveEmissionsFromEnergy(false);

    }

    const handleTransport = () => {
        setOpenTransport(true);
    }

    const handleEnergyInBuildings = () => {
        setOpenEnergyInBuildings(true);
    }

    const handleEnergyInIndustry = () => {
        setOpenEnergyInIndustry(true);
    }

    const handleEnergyInAgri = () => {
        setOpenEnergyInAgri(true);
    }

    const handleUnallocatedFuelCombustion = () => {
        setOpenUnallocatedFuelCombustion(true);
    }

    const handleFugitiveEmissionsFromEnergy = () => {
        setOpenFugitiveEmissionsFromEnergy(true);
    }

    return (
        <Card className='v9helper'>
        <h3>Energy</h3>
        <ul>
            {subSectorData.slice(0,6).map((x, i) => {
                return <li key={i}>{x.subSector}: {x.subSectorShare}%</li>
            })}
        </ul>

        <Popup open={openTransport} closeOnDocumentClick onClose={closeModal}>
            <Transport subSectorFurtherBreakdown={subSectorFurtherBreakdown} subSectorFurtherBreakdownShare={subSectorFurtherBreakdownShare} />
        </Popup>
        
        <Popup open={openEnergyInBuildings} closeOnDocumentClick onClose={closeModal}>
            <EnergyInBuildings subSectorFurtherBreakdown={subSectorFurtherBreakdown} subSectorFurtherBreakdownShare={subSectorFurtherBreakdownShare} />
        </Popup>

        <Popup open={openEnergyInIndustry} closeOnDocumentClick onClose={closeModal}>
            <EnergyInIndustry subSectorFurtherBreakdown={subSectorFurtherBreakdown} subSectorFurtherBreakdownShare={subSectorFurtherBreakdownShare} />
        </Popup>

        <Popup open={openEnergyInAgri} closeOnDocumentClick onClose={closeModal}>
            <EnergyInAgri subSectorFurtherBreakdown={subSectorFurtherBreakdown} subSectorFurtherBreakdownShare={subSectorFurtherBreakdownShare} />
        </Popup>

        <Popup open={openUnallocatedFuelCombustion} closeOnDocumentClick onClose={closeModal}>
            <UnallocatedFuelCombustion subSectorFurtherBreakdown={subSectorFurtherBreakdown} subSectorFurtherBreakdownShare={subSectorFurtherBreakdownShare} />
        </Popup>

        <Popup open={openFugitiveEmissionsFromEnergy} closeOnDocumentClick onClose={closeModal}>
            <FugitiveEmissionsFromEnergy subSectorFurtherBreakdown={subSectorFurtherBreakdown} subSectorFurtherBreakdownShare={subSectorFurtherBreakdownShare} />
        </Popup>
        <Button onClick={handleTransport}>Transport</Button>
        &nbsp;
        <Button onClick={handleEnergyInBuildings}>Energy in buildings (elec and heat)</Button>
        &nbsp;
        <Button onClick={handleEnergyInIndustry}>Energy in industry</Button>
        &nbsp;
        <Button onClick={handleEnergyInAgri}>Energy in Agri & Fishing</Button>
        &nbsp;
        <Button onClick={handleUnallocatedFuelCombustion}>Unallocated fuel combustion</Button>
        &nbsp;
        <Button onClick={handleFugitiveEmissionsFromEnergy}>Fugitive emissions from energy</Button>
        </Card>
        
    )
}

export default Energy