import React, {useEffect} from 'react';
import Chip from "./Chip";
import { useSelector } from "react-redux";

const getChosenMetrics = state =>{
    return state.metrics.chosenMetrics;
} 

const liveMetrics = {}
// const units = {"PSI": "PSI", "F":"F", "%":"%"}

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

    //click off liveData
    for(let metric in liveMetrics){
      if(!chosenMetrics.includes(metric)){
          delete liveMetrics[metric]
      }
    }
    // check unit
    const units = {"tubingPressure":"PSI", "casingPressure":"PSI", "oilTemp":"F", "flareTemp":"F", "waterTemp" : "F", "injValveOpen":"%"}
   
    return(
        <div>
            {Object.keys(liveMetrics).map((key, index)=>
                <Chip key = {index} label = {`${key}: ${liveMetrics[key]}(${units[key]})`} />
            )}
        </div>
       )
}
export default LiveData
