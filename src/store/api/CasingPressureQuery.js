import React, { useEffect } from "react";
import { Provider, createClient, useQuery } from "urql";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import LinearProgress from "@material-ui/core/LinearProgress";

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
        <CasingPressure/>
      </Provider>
  )
}

const after = Date.now() - 1000 * 60 * 30

const CasingPressure = () =>{

    const dispatch = useDispatch();
    const metric = "casingPressure" 
    const casingData = {
        metricName: metric,
        after: after 
    } 
    const [result] = useQuery({
        query,
        variables: {
          metric: casingData
        }
    }) 

    const { fetching, data, error} = result;
    //similar to componentDidMount
    useEffect(()=>{
        if(error){
            dispatch({type:actions.API_ERROR, error: error.message});
            return;
        }
        if(!data) return;
        const getCasingData = data
        dispatch({type: actions.CASING_DATA_RECEIVED, getCasingData});
       },
       [dispatch, data, error]
   ); 
   if (fetching) return <LinearProgress/>
   return(<div>
           
          </div>) 
}