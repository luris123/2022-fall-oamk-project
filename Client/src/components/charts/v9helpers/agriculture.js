function Agriculture ({subSector, subSectorShare}) {
    
        let subSectorData = subSector.map((x, i) => {
            return {subSector: x, subSectorShare: subSectorShare[i]}
        })    
    
        return (
            <>
            <h3>Agriculture</h3>
            <ul>
                {subSectorData.slice(8,15).map((x, i) => {
                    return <li key={i}>{x.subSector}: {x.subSectorShare}% <button>breakdown</button></li>
                })}
            </ul>
    
            </>
            
        )
}

export default Agriculture