import React, { useEffect } from 'react';
import ApiNominatimService from "./services/nominatim/nominatim.service"

function App() {
    useEffect(()=>{
      ApiNominatimService.fetchNominatim({search:"kayseri"}).then((res)=>{
        console.log(res)
      })
    }, [])
  return (
    <>
    </>
  );
}

export default App;
