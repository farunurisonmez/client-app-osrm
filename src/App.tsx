import React from 'react';
import OpenStreetMapComponent from './components/map/openStreet.map.component';
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
      <Provider store={store}>
        <OpenStreetMapComponent/>
      </Provider>
  );
}

export default App;
