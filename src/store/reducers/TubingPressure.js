import * as actions from "../actions";
const initialState = {
  timestamps:[],
  unit:"PSI",
  values:[]
};

const tubingDataReceived = (state, action) => {
   const values = []
   state.timestamps = action.getTubingData.getMeasurements.map(data=> data.at)
   state.values = action.getTubingData.getMeasurements.map(data=>(data.value))
   return{...state}
};



export default (state = initialState, action) => {
  switch(action.type){
    case `${actions.TUBING_DATA_RECEIVED}`:
       return tubingDataReceived(initialState, action)
    break;
  }

  return state
};