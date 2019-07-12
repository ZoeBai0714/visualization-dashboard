import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import Multiselect from 'multiselect-dropdown-react';

//access state
const getMetrics = state => {
    return state.metrics.metrics
}

const MetricContainer = () =>{
    //display all metrics options
    const metrics = useSelector(getMetrics)
    const metricsData = []
    metrics.map(metric => metricsData.push({name:`${metric}`, value:`${metric}`}))
    //filter metrics
    const dispatch = useDispatch();
    const selectMetrics = (options) =>{
      const chosenMetrics = options  
      dispatch({type:actions.METRICS_FILTER_RECEIVED, chosenMetrics})
    }
    return(
      <Multiselect options={metricsData} onSelectOptions={selectMetrics} />
    )
}

export default MetricContainer


