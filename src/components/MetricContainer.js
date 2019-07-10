import React, { useEffect } from "react";
import { Provider, createClient, useQuery } from "urql";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";

const client = createClient({
    url: "https://react.eogresources.com/graphql"
  });

const query = `{
    getMetrics
}`


// container should have a metrics filter to choose which graph to show
export default()=>{
  return(
      <Provider value = {client}>
        <Metrics/>
      </Provider>
  )
}
 
const Metrics = () =>{
     const dispatch = useDispatch();
     // get access to chosenMetrics in the state
     const getChosenMetrics = state =>{
         const chosenMetrics = state.metrics.chosenMetrics
         return{chosenMetrics}
     }
     const {chosenMetrics} = useSelector(getChosenMetrics)
     //dispatch metrics to state for graph
     const handleChange = (e) =>{
        const chosenMetric = e.target.value
        dispatch({type:actions.METRICS_FILTER_RECEIVED, chosenMetric})
     }


    // fetch all the metrics
    const [result] = useQuery({
        query
    })

    const {fetching, data, error} = result;
    useEffect(()=>{
        if(error){
            dispatch({type:actions.API_ERROR, error: error.message});
            return;
        }
        if(!data) return;
        const {getMetrics} = data
        dispatch({type: actions.METRICS_DATA_RECEIVED, getMetrics});
       },

       [dispatch, data, error]
   );
   if(fetching) return <LinearProgress/>



   return(<div>
           <select onChange = {handleChange}>
            <option value = "">Select Metrics</option>   
            {data.getMetrics.map((metric, index) =>  <option key = {index} value = {metric}>{metric}</option>)}
           </select>
          </div>) 
}

