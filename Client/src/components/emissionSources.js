import V9 from './charts/v9';
import V8 from './charts/v8';


function EmissionSources() {
    return (
        <div>
        <h1>EmissionSources</h1>
        <V8 show={true}/>
        <V9 show={true}/>
        </div>
    )
}

export default EmissionSources;