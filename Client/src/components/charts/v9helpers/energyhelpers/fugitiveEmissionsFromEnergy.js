function FugitiveEmissionsFromEnergy ({subSectorFurtherBreakdown, subSectorFurtherBreakdownShare}) {
    let subSectorFurtherBreakdownData = subSectorFurtherBreakdown.map((x, i) => {
        return {subSectorFurtherBreakdown: x, subSectorFurtherBreakdownShare: subSectorFurtherBreakdownShare[i]}
    })
    return (
        <>
        <h3>Fugitive emissions from energy</h3>
        <ul>
            {subSectorFurtherBreakdownData.slice(16,18).map((x, i) => {
                return <li key={i}>{x.subSectorFurtherBreakdown}: {x.subSectorFurtherBreakdownShare}%</li>
            })}
        </ul>
        </>
    )
}

export default FugitiveEmissionsFromEnergy