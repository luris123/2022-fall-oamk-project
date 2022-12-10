import { Card } from 'react-bootstrap';
import '../../../css/v9helper.css'

function Industrial ({subSector, subSectorShare}) {
    
        let subSectorData = subSector.map((x, i) => {
            return {subSector: x, subSectorShare: subSectorShare[i]}
        })    
    
        return (
            <Card className='v9helper'>
            <h3>Industrial Processes</h3>
            <ul>
                {subSectorData.slice(6,8).map((x, i) => {
                    return <li key={i}>{x.subSector}: {x.subSectorShare}%</li>
                })}
            </ul>
    
            </Card>
            
        )
}

export default Industrial