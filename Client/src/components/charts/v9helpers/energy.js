function Energy ({subSector, subSectorShare}) {

    let subSectorData = subSector.map((x, i) => {
        return {subSector: x, subSectorShare: subSectorShare[i]}
    })    

    return (
        <>
        <h3>Energy</h3>
        <ul>
            {subSectorData.slice(0,6).map((x, i) => {
                return <li key={i}>{x.subSector}: {x.subSectorShare}% <button>breakdown</button></li>
            })}
        </ul>

        </>
        
    )
}

export default Energy