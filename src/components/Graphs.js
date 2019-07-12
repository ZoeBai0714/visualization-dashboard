import React, { useEffect }from "react";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import { styler } from "react-timeseries-charts"
//get access to state
// const getChosenMetrics = state =>{
//     console.log(state)
//     return state.metrics.chosenMetrics;
// }

// const getTubeData = state =>{
//     return state.tube
// }

// const getCasingData = state =>{
//     return state.casing
// }

const Graphs = ({data}) =>{
   
    const dataObjects = data.map(metric => {
        console.log(metric.measurements[0].unit)
        return new TimeSeries({
                name: metric.metric,
                columns: ["time", "value"],
                unit:metric.measurements[0].unit,
                points: metric.measurements.map( entry => {console.log(entry);return[ entry.at, entry.value] })
            })
    })
    console.log(dataObjects)
    
    //create time series and time ranges for each metric
    //tubingPressure
    // const tubeChartData = {
    //     name: "traffic",
    //     columns: ["time", "value"],
    //     points: tubeData.timestamps.map( (timestamp, index) => [ timestamp, tubeData.values[index] ] )
    // };
    // const tubingPressure = new TimeSeries(tubeChartData);
    // // casingPressure
    // const casingChartData = {
    //     name:"traffic",
    //     columns: ["time", "value"],
    //     points: casingData.timestamps.map((timestamp, index) => [timestamp, casingData.values[index]])
    // }

    // const allData = new TimeSeries(dataObjects[0]);
    
    if(dataObjects.length === 0) return null
    return(
        <div>
            <ChartContainer timeRange={dataObjects[0].timerange()} width={1200} minTime={0} maxTime={10000} paddingRight={100}>
                <ChartRow height="600">
                    {dataObjects.map((metric, index)=>  <YAxis id={index+1} label= {"Unit: "+metric._data._root.entries[1][1]} min={0} max={2000} width="60" type="linear" format=""/>)}
                    {/* <YAxis id="1" label="Unit PSI" min={0} max={2000} width="60" type="linear" format="$,.2f"/> */}
                     <Charts>
                        {dataObjects.map((metric, index) => 
                             <LineChart axis= {index+1} series={metric} columns={["time", "value"]}/> )}
                         <cycling/>    
                    </Charts>
                </ChartRow>
            </ChartContainer>
        </div>
    )
}

export default Graphs;
