function Waste ({subSector, subSectorShare}) {
        
            let subSectorData = subSector.map((x, i) => {
                return {subSector: x, subSectorShare: subSectorShare[i]}
            })    
        
            return (
                <>
                <h3>Waste</h3>
                <ul>
                    {subSectorData.slice(15,17).map((x, i) => {
                        return <li key={i}>{x.subSector}: {x.subSectorShare}%</li>
                    })}
                </ul>
        
                </>
                
            )
        }

        export default Waste