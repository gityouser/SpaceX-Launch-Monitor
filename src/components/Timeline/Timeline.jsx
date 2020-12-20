import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  imageContainer: {
    width: "100px",
    height: "100px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
}));

function LaunchesTimeline({ data }) {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      {data.map((entry, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {dayjs(entry.date_local).format("DD-MM-YYYY")}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <div className={classes.imageContainer}>
                <img className={classes.image} src={entry.links.patch.small} />
              </div>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                {entry.name}
              </Typography>
              <Typography>{entry.details}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default LaunchesTimeline;
