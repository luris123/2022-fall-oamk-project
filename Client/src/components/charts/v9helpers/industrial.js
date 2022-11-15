function Industrial ({subSector, subSectorShare}) {
    
        let subSectorData = subSector.map((x, i) => {
            return {subSector: x, subSectorShare: subSectorShare[i]}
        })    
    
        return (
            <>
            <h3>Industrial Processes</h3>
            <ul>
                {subSectorData.slice(6,8).map((x, i) => {
                    return <li key={i}>{x.subSector}: {x.subSectorShare}% <button>breakdown</button></li>
                })}
            </ul>
    
            </>
            
        )
}

export default Industrial