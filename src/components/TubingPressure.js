import React from "react";
import { Provider, createClient, useQuery } from "urql";


const client = createClient({
    url: "https://react.eogresources.com/graphql"
  });

const query = `query($input:MeasurementQuery){
    getMeasurements(input:$input){
        metric,
        at,
        value,
        unit
    }
}`  

const getTubingPressure = state =>{
    const {}
}