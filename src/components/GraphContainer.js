import React, { useEffect }from "react";
import { useQuery, createClient, Provider } from "urql";
import { useSelector } from 'react-redux'
import Graphs from './Graphs'
//get access to state
const getChosenMetrics = state =>{
    return state.metrics.chosenMetrics;
}
const after = Date.now() - 1000 * 60 * 30
const query = `
query($measurementQueries: [MeasurementQuery]) {
    getMultipleMeasurements(input: $measurementQueries) {
        metric
        measurements {
            at
            value
            unit
        }
    }
}`


const GraphContainer = () =>{ 
    const chosenMetrics = useSelector(getChosenMetrics);
    const [results] = useQuery({
        query,
        variables: {
            measurementQueries: chosenMetrics.map( metricName => ({ metricName, after }))
        }
    })
    if (results.data === undefined) return null
   
    return(
        <Graphs data={results.data.getMultipleMeasurements}/>
    )
}

const client = createClient({
    url: "https://react.eogresources.com/graphql"
  });


export default () => (
    <Provider value={client}>
        <GraphContainer />
    </Provider>
)
