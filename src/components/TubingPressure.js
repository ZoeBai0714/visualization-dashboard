import React, { useEffect } from "react";
import { Provider, createClient, useQuery } from "urql";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
// import LinearProgress from "@material-ui/core/LinearProgress";

const client = createClient({
    url: "https://react.eogresources.com/graphql"
  });

const query = `
    query($metric: MeasurementQuery!) {
        getMeasurements(input: $metric) {
          metric
          at
          value
          unit
        }
      }`

 

export default()=>{
  return(
      <Provider value = {client}>
        <Graph/>
      </Provider>
  )
}
 
const Graph = () =>{
    const dispatch = useDispatch();
    // const {metrics} = useSelector(getMetrics) //get metrics from mapStateToProps
    const metric = "tubingPressure"
    const after = Date.now() - 1000 * 60 * 30
    const measurementQuery = {
        metricName: metric,
        after: after 
    } 
    const [result] = useQuery({
        query,
        variables: {
          metric: measurementQuery
        }
    })
   
    const { /*fetching,*/ data, error} = result;
    useEffect(()=>{
        if(error){
            dispatch({type:actions.API_ERROR, error: error.message});
            return;
        }
        if(!data) return;
        const {getMeasurements} = data
        dispatch({type: actions.TUBING_DATA_RECEIVED, getMeasurements});
       },

       [dispatch, data, error]
   );
  //  if(fetching) return <LinearProgress/>
   return(<div>
            wasup
          </div>) 
}

