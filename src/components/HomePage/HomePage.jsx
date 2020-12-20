import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 800,
  },
});
function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h2" gutterBottom>
        Welcome
      </Typography>
      <Typography variant="h5" gutterBottom>
        This application allows you to explore the SpaceX launches.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Use the left side navigation to access the launches Timeline or hit
        Explore to find out more info about each launch.
      </Typography>
    </div>
  );
}

export default HomePage;
