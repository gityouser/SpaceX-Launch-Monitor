import Axios from "axios";
import React, { useState, useEffect } from "react";

import ResponsiveDrawer from "../ResponsiveDrawer";
import { BrowserRouter } from "react-router-dom";

import { launchesURL, appRoutes } from "../utils";

function App() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    async function fetchSpaceData() {
      try {
        const { data } = await Axios.get(launchesURL);
        setLaunches(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchSpaceData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ResponsiveDrawer routes={appRoutes} launches={launches} />
      </BrowserRouter>
    </div>
  );
}

export default App;
