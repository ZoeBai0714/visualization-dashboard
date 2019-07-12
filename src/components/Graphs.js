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
    // const chartColors = () =>{
    //     const letters = '0123456789ABCDEF';
    //     let color = '#';
    //     for (var i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)]; // so the index of letter will be always smaller than 16
    //     }
    //     return color;
    // }
    // const chartStyle = styler([{key:'value', color: chartColors()}])
    const chartColors = {1:'orange', 2:'#e320bf', 3:"blue", 4:"green", 5:"purple", 6:"black"}
    if(dataObjects.length === 0) return null
    return(
        <div>
            <ChartContainer timeRange={dataObjects[0].timerange()} width={1200} minTime={0} maxTime={10000} paddingRight={100}>
                <ChartRow height="600">
                    {dataObjects.map((metric, index)=>  <YAxis id={index+1} label= {"Unit: "+metric._data._root.entries[1][1]} min={0} max={2000} width="100" type="linear" format=""/>)}
                     <Charts>
                        {dataObjects.map((metric, index) => 
                             <LineChart style = {styler([{key:'value', color:chartColors[index+1]}])} axis= {index+1} series={metric} columns={["time", "value"]}/> )}
                         <cycling/>    
                    </Charts>
                </ChartRow>
            </ChartContainer>
        </div>
    )
}

export default Graphs;
