import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries} from "pondjs";
import { styler } from "react-timeseries-charts";
import * as actions from "../store/actions";

//access to the tracker position in state
const getTrackerPosition = state =>{
    return state.tracker.time
}

const getTrackerValues = state =>{
    return state.tracker.values
}

const Graphs = ({data}) =>{
    const trackerInfoValues = useSelector(getTrackerValues)
    const dispatch = useDispatch();
    const tracker = useSelector(getTrackerPosition);
    const metrics = [...data.map(metric => metric.metric)];
    // const result = [];
    
    const handleTrackerChanged = (time) =>{
       if(time){
           const values = []
           const test = dataObjects.map(metric => metric.atTime(time)._d._root.entries[1][1]._root.entries[0][1])
        
           const keyValues = {}
           metrics.map((metric, index) => {
               if(!keyValues[metric]){
                keyValues[metric] = test[index]
               }else{
                keyValues[metric] = test[index]
               }
               return true
           })
           for(let key in keyValues){
               const obj = {}
               obj["label"] = key
               obj["value"] = keyValues[`${key}`].toString()//fixed the warning invalid prop type
             values.push(obj)
           }
          
            // must dispatch time and value at the same time, because they happend at the same time
            // dispatch separately will cause one of them get overwritten
            dispatch({
                type:actions.TRACKER_VALUES_RECEIVED,
                values: values,
                time: time
            })
            
       }
    }
   
    
    const dataObjects = data.map(metric => {
        return new TimeSeries({
                name: metric.metric,
                columns: ["time", "value"],
                unit:metric.measurements[0].unit,
                points: metric.measurements.map( entry => {;return[ entry.at, entry.value]}) 
            })
    })
    
    const chartColors = {1:'orange', 2:'#e320bf', 3:"blue", 4:"green", 5:"purple", 6:"black"}
    const YIndex = {} // Same unit shares the same YAxis, assign each unit an index, render YAxis accordingly, and set XAxis the same index 

    if(dataObjects.length === 0) return null
    return(
        <div>
            <ChartContainer trackerPosition = {tracker} onTrackerChanged = {handleTrackerChanged} timeRange={dataObjects[0].timerange()} width={1500} /*minTime={0} maxTime={10000}*/ paddingRight={100}>
                <ChartRow trackerInfoValues={trackerInfoValues} trackerInfoHeight={0} trackerInfoWidth = {0} height={"550"}>
                    {dataObjects.map((metric, index)=> {
                        const unit = metric._data._root.entries[1][1] 
                            if(!YIndex[unit]){
                                YIndex[unit] = index + 1 ;
                                index += 1;
                                return <YAxis key = {index} id={`${YIndex[unit]}`} label= {"Unit: "+metric._data._root.entries[1][1]} min={0} max={2000} width="100" type="linear" format=""/>
                            }
                            return true
                        }
                     )}
                     <Charts>
                        {dataObjects.map((metric, index) =>{
                              const unit = metric._data._root.entries[1][1] 
                              return <LineChart key = {index} style = {styler([{key:'value', color:chartColors[index+1]}])} axis= {`${YIndex[unit]}`} series={metric} columns={["time", "value"]}/>})}
                    </Charts>
                </ChartRow>
            </ChartContainer>
        </div>
    )
}

export default Graphs;
