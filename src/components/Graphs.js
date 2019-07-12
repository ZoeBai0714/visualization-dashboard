import React, { useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import { styler } from "react-timeseries-charts";
import * as actions from "../store/actions";


//access to the tracker position in state
const getTrackerPosition = state =>{
    return state.tracker.time
}

const getTrackerValues = state =>{
    console.log(state.tracker.values)
    return state.tracker.values
}
const Graphs = ({data}) =>{
   
    // tracker
    const dispatch = useDispatch();
    const tracker = useSelector(getTrackerPosition);
    const metrics = [...data.map(metric => metric.metric)];
    const result = [];
    const something = useSelector(getTrackerValues)
    console.log(something)
    const trackerInfoValues =something
    console.log(trackerInfoValues)
    const handleTrackerChanged = (time) =>{
       if(time){
           const values = []
           //const e = dataObjects[0].atTime(time)
           const test = dataObjects.map(metric => metric.atTime(time)._d._root.entries[1][1]._root.entries[0][1])
           
           //console.log(dataObjects.map((metric, index) => console.log(metric._collection._eventList._root, index)))
           //const value = e._d._root.entries[1][1]._root.entries[0][1]
           const keyValues = {}
           metrics.map((metric, index) => {
               if(!keyValues[`${metric}`]){
                keyValues[`${metric}`] = test[index]
               }else{
                keyValues[`${metric}`] = test[index]
               }
           })
           for(let key in keyValues){
               const obj = {}
               obj["label"] = key
               obj["value"] = keyValues[`${key}`]
             values.push(obj)
           }
           console.log(values)
            // metrics.map((metric, index) =>{ 
            //     const obj = { label:"", value:""}                                                       
            //     obj["label"] = metric
            //     obj["value"] = test[index]
            //     result.push(obj)
            //     result.map(infoObj => trackerInfoValues.push(infoObj))
            // })
            dispatch({type:actions.TRACKER_VALUES_RECEIVED, values})
            dispatch({type: actions.TRACKER_POSITION_RECEIVED, time})
       }
       
    }
     
    //  console.log(trackerInfoValues)
    // const trackerInfoValues = [
    //     {label: "Speed", value: 222},
    //     {label: "HR", value: 333}
    // ];
    
    
    const dataObjects = data.map(metric => {
        return new TimeSeries({
                name: metric.metric,
                columns: ["time", "value"],
                unit:metric.measurements[0].unit,
                points: metric.measurements.map( entry => {;return[ entry.at, entry.value]}) // {at: 1562955971646, value: 1276.59, unit: "PSI", __typename: "Measurement"}
            })
    })
    
    const chartColors = {1:'orange', 2:'#e320bf', 3:"blue", 4:"green", 5:"purple", 6:"black"}
    if(dataObjects.length === 0) return null
    return(
        <div>
            <ChartContainer trackerPosition = {tracker} onTrackerChanged = {handleTrackerChanged} timeRange={dataObjects[0].timerange()} width={1200} minTime={0} maxTime={10000} paddingRight={100}>
                <ChartRow trackerInfoValues={trackerInfoValues} trackerInfoHeight={50} height="600">
                    {dataObjects.map((metric, index)=>  <YAxis id={index+1} label= {"Unit: "+metric._data._root.entries[1][1]} min={0} max={2000} width="100" type="linear" format=""/>)}
                     <Charts>
                        {dataObjects.map((metric, index) =>{;
                             return <LineChart style = {styler([{key:'value', color:chartColors[index+1]}])} axis= {index+1} series={metric} columns={["time", "value"]}/> })}
                         <cycling/>    
                    </Charts>
                </ChartRow>
            </ChartContainer>
        </div>
    )
}

export default Graphs;
