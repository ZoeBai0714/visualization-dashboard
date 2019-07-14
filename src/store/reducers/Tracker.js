import * as actions from "../actions";
const initialState = {
    time:null,
    values:[]
}

const trackerValuesReceived = (state, action) =>{
   return{...state, values:[...action.values], time: action.time} 
}

export default (state = initialState, action) =>{
    switch(action.type){
    case `${actions.TRACKER_VALUES_RECEIVED}`:
        return trackerValuesReceived(initialState, action)
    }
    return state
}