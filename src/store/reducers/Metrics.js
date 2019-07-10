import * as actions from "../actions";
const initialState = {
  metrics:[],
  chosenMetrics:[]
};

// get all the metrics for dropdown menu
const metricsDataReceived = (state, action) => {
  const { getMetrics } = action;
  const {metrics} = getMetrics;
  return {
    metrics
  };
};

// filter chosen metrics for graph
const chosenMetrics = (state, action)=>{
  state.chosenMetrics = state.chosenMetrics.concat(action.chosenMetric)
  console.log(state.chosenMetrics)
  return{...state, chosenMetrics:state.chosenMetrics}
}


export default (state = initialState, action) => {
  switch(action.type){
    case `${actions.METRICS_DATA_RECEIVED}`:
       return metricsDataReceived(initialState, action)
    break;

    case `${actions.METRICS_FILTER_RECEIVED}`:
        return chosenMetrics(initialState, action)
    break;     
  }
  return state
 
};
    
