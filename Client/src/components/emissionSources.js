import V9 from './charts/v9';
import V8 from './charts/v8';


function EmissionSources() {
    return (
        <div>
        <V8 show={true}/>
        <V9 show={true}/>
        </div>
    )
}

export default EmissionSources;