import React, { useEffect } from "react";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { useDispatch, useSelector } from "react-redux";
import { TimeSeries, TimeRange } from "pondjs";

//get access to state
const getChosenMetrics = state =>{
    return state.metrics.chosenMetrics;
}

const getTubeData = state =>{
    return state.tube
}

const Graphs = () =>{  
    const chosenMetrics = useSelector(getChosenMetrics);
    const tubeData = useSelector(getTubeData);
    //storage for all metrics
    // const channels = {
    //    "tubingPressure":{
    //        unit:"PSI",
    //        label:"tubingPressure",
    //        format:"", //not sure what this is
    //        series: null,
    //        show:false
    //    }
    //    //all the other metrics continue here
    // }

    //create time series and time ranges
    const data = {
        name: "traffic",
        columns: ["time", "value"],
        points: tubeData.timestamps.map( (timestamp, index) => [ timestamp, tubeData.values[index] ] )
    };
    const series1 = new TimeSeries(data);
    // const timerange = series1;
    // const minDuration = 10 * 60 * 1000;
    if(tubeData.values.length === 0) return null
    
    return(
        <div>
            <ChartContainer timeRange={series1.timerange()} width={1200} minTime={0} maxTime={10000} paddingRight={100}>
                <ChartRow height="600">
                    <YAxis id="y" label="Unit PSI" min={0} max={2000} width="60" type="linear" format="$,.2f"/>
                    <Charts>
                        <LineChart axis="y" series={series1} columns={["time", "value"]}/>
                        {/* <LineChart axis="y" series={series1}/> */}
                    </Charts>
                    {/* <YAxis id="axis2" label="Euro" min={0.5} max={1.5} width="80" type="linear" format="$,.2f"/> */}
                </ChartRow>
            </ChartContainer>
        </div>
    )
}

export default Graphs;
