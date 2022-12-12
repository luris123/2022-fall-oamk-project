import { Card } from 'react-bootstrap';
import '../../../../css/v9helper.css'

function EnergyInAgri ({subSectorFurtherBreakdown, subSectorFurtherBreakdownShare}) {
    let subSectorFurtherBreakdownData = subSectorFurtherBreakdown.map((x, i) => {
        return {subSectorFurtherBreakdown: x, subSectorFurtherBreakdownShare: subSectorFurtherBreakdownShare[i]}
    })
    return (
        <Card className='v9helper'>
        <h3>Energy in Agri & Fishing</h3>
        <ul>
            {subSectorFurtherBreakdownData.slice(14,15).map((x, i) => {
                return <li key={i}>{x.subSectorFurtherBreakdown}: {x.subSectorFurtherBreakdownShare}%</li>
            })}
        </ul>
        </Card>
    )
}

export default EnergyInAgri