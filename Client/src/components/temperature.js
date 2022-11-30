import V1V2 from './charts/v1v2';
import V3 from './charts/v3';
import V5 from './charts/v5';
import V7 from './charts/v7';
import V6 from './charts/v6';

function Temperature() {

  //Temporary test below will be changed to chart later on...
  return (
    <div>
      <V1V2 show={true}/>
      <V3 show={true}/>
      <V5 show={true}/>
      <V6 show={true}/>
      <V7 show={true}/>
    </div>
  )
}

export default Temperature;

