import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Weather from "./Weather";
import LiveDataContainer from "./LiveDataContainer"
import {useSelector} from "react-redux";

const getChosenMetrics = state =>{
  return state.metrics.chosenMetrics;
}
const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
});


export default () => {
  const classes = useStyles();
  const chosenMetrics = useSelector(getChosenMetrics);
  //const name = "Zoe_Bai's";
  return (
    <AppBar position="static">
      <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
               EOG Resources
            </Typography>
            {chosenMetrics.length > 0? <LiveDataContainer/> : null}
          <Weather />
      </Toolbar>
    </AppBar>
  );
};
