import React, { useEffect } from "react";
import { Provider, createClient, useQuery } from "urql";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { map } from "wonka";
import LinearProgress from "@material-ui/core/LinearProgress";

const client = createClient({
    url: "https://react.eogresources.com/graphql"
  });

const query = `{
    getMetrics
}`

               
// similar to mapStateToProps
const getMetrics = state =>{
    const {metrics} = state.metrics
    return {metrics}
}               


export default()=>{
  return(
      <Provider value = {client}>
        <Metrics/>
      </Provider>
  )
}
 
const Metrics = () =>{
    const dispatch = useDispatch();
    const {metrics} = useSelector(getMetrics) //get metrics from mapStateToProps
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
   console.log(data.getMetrics)
   return(<div>
           <select>
           {data.getMetrics.map(metric => <option>{metric}</option>)}
           </select>
          </div>) 
}

