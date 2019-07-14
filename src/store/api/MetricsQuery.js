import React, { useEffect } from "react";
import { Provider, createClient, useQuery } from "urql";
import { useDispatch} from "react-redux";
import * as actions from "../actions";
import LinearProgress from "@material-ui/core/LinearProgress";

const client = createClient({
    url: "https://react.eogresources.com/graphql"
  });

const query = `{
    getMetrics
}`

export default()=>{
    return(
        <Provider value = {client}>
          <Metrics/>
        </Provider>
    )
  }
   
const Metrics = () =>{
    const dispatch = useDispatch();
   
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

      //[ data ]
  );
  if(fetching) return <LinearProgress/>
  return(<div>

         </div>) 
}