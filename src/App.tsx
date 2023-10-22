import React, { useEffect } from 'react';
import ApiNominatimService from "./services/nominatim/nominatim.service"
import ApiOSRMService from './services/osrm/osrm.service';

function App() {
    useEffect(()=>{
      /* ApiNominatimService.fetchNominatim({search:"kayseri"}).then((res)=>{
        console.log(res)
      }) */
      ApiOSRMService.fetchRoute({
        startingCoordinate: [38, 34],
        endCoordinate: [38,33]
      }).then(res=>{
        console.log(res)
      }).catch((err)=>console.log(err))
    }, [])
  return (
    <>
    </>
  );
}

export default App;
