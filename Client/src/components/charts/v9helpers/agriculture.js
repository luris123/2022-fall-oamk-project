import { Card } from 'react-bootstrap';
import '../../../css/v9helper.css'

function Agriculture ({subSector, subSectorShare}) {
    
        let subSectorData = subSector.map((x, i) => {
            return {subSector: x, subSectorShare: subSectorShare[i]}
        })    
    
        return (
            <Card className='v9helper'>
            <h3>Agriculture</h3>
            <ul>
                {subSectorData.slice(8,15).map((x, i) => {
                    return <li key={i}>{x.subSector}: {x.subSectorShare}%</li>
                })}
            </ul>
    
            </Card>
            
        )
}

export default Agriculture