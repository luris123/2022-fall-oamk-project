function Transport ({subSectorFurtherBreakdown, subSectorFurtherBreakdownShare}) {
    let subSectorFurtherBreakdownData = subSectorFurtherBreakdown.map((x, i) => {
        return {subSectorFurtherBreakdown: x, subSectorFurtherBreakdownShare: subSectorFurtherBreakdownShare[i]}
    })
    return (
        <>
        <h3>Transport</h3>
        <ul>
            {subSectorFurtherBreakdownData.slice(0,5).map((x, i) => {
                return <li key={i}>{x.subSectorFurtherBreakdown}: {x.subSectorFurtherBreakdownShare}%</li>
            })}
        </ul>
        </>
    )
}

export default Transport