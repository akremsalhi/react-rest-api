

import FetchingData from './FetchingData'
import SubmittingData from './SubmittingData';


function App() {

  return (
    <div className="container mx-auto p-40">
      <div className="grid grid-cols-1 gap-y-8">
        <FetchingData/>
        {/* <SubmittingData/> */}
      </div>
    </div>
  );
}

export default App;
