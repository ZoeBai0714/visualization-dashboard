import * as actions from "../actions";
const initialState = {
  timestamps:[],
  unit:"PSI",
  values:[]
};

const casingDataReceived = (state, action) => {
    state.timestamps = action.getCasingData.getMeasurements.map(data=> data.at)
    state.values = action.getCasingData.getMeasurements.map(data=> data.value)
    return{...state}
 };

 export default (state = initialState, action) => {
    switch(action.type){
      case `${actions.CASING_DATA_RECEIVED}`:
         return casingDataReceived(initialState, action)
      break;
    }
  
    return state
  };
 