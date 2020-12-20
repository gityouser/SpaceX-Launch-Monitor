import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import ExploreIcon from "@material-ui/icons/Explore";

import LaunchesTimeline from "../Timeline/LaunchesTimeline";
import DataTable from "../DataTable";
import HomePage from "../HomePage/HomePage.jsx";

export const launchesURL = "https://api.spacexdata.com/v4/launches/";

export const appRoutes = [
  {
    path: "/",
    title: "Home",
    icon: <HomeIcon />,
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "/timeline",
    title: "Timeline",
    icon: <TimelineIcon />,
    exact: true,
    main: (props) => <LaunchesTimeline {...props} />,
  },
  {
    path: "/explore",
    title: "Explore",
    icon: <ExploreIcon />,
    exact: true,
    main: (props) => (
      <>
        {/* <FilterBar /> */}
        <DataTable {...props} />
      </>
    ),
  },
];
