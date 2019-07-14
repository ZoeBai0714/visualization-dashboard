import React from 'react';
import Chip from "./Chip";
import { useSelector } from "react-redux";

const getChosenMetrics = state =>{
    return state.metrics.chosenMetrics;
} 
const liveMetrics = {}

const LiveData =({liveData}) =>{
    const chosenMetrics = useSelector(getChosenMetrics);
        chosenMetrics.map(metric=>{if(metric === liveData.newMeasurement.metric){
            if(!liveMetrics[metric]){
                liveMetrics[metric] = liveData.newMeasurement.value
            }else{
                liveMetrics[metric] = liveData.newMeasurement.value
            } 
        }
       })
    return(
        <div>
            {Object.keys(liveMetrics).map((key, index)=>
                <Chip key = {index} label = {`${key}: ${liveMetrics[key]}`} />
            )}
        </div>
       )
}
export default LiveData
