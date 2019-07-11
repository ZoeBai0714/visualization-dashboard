import * as actions from "../actions";
const initialState = {
  timestamps:[],
  unit:"PSI",
  values:[]
};

const tubingDataReceived = (state, action) => {
   const timestamps = [],values = []
   // for graph we need an array of arrays,concat returns this
   state.timestamps = action.getTubingData.getMeasurements.map(data=> data.at)
   action.getTubingData.getMeasurements.map(data=> values.push(data.value))
   return{...state, values:values}
};



export default (state = initialState, action) => {
  switch(action.type){
    case `${actions.TUBING_DATA_RECEIVED}`:
       return tubingDataReceived(initialState, action)
    break;
  }

  return state
};