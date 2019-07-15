import * as actions from "../actions";
const initialState = {
  metrics:[],
  chosenMetrics:[]
};

// get all the metrics for dropdown menu
const metricsDataReceived = (state, action) => {
  return{...state, metrics:action.getMetrics}
};
 
// filter chosen metrics for graph
const chosenMetrics = (state, action)=>{
  return{...state, chosenMetrics: [...action.chosenMetrics]}
}


export default (state = initialState, action) => {
  switch(action.type){
    case `${actions.METRICS_DATA_RECEIVED}`:
       return metricsDataReceived(initialState, action)

    case `${actions.METRICS_FILTER_RECEIVED}`:
        return chosenMetrics(initialState, action) 
    default:
        return state

  }
  // return state
 
};
    
