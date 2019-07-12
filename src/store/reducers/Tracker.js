import * as actions from "../actions";
const inistialState = {
    time:null,
    values:[]
}

const trackerPositionReceived = (state, action) =>{
    return{...state, time:action.time}
}
 
const trackerValuesReceived = (state, action) =>{
   console.log(action.values)
    return {...state, values:[...action.values]}
}
// const trackerInfoValues = [
//     {label: "Speed", value: speedValue},
//     {label: "HR", value: hrValue}
// ];
export default (state = inistialState, action) =>{
    switch(action.type){
     case`${actions. TRACKER_POSITION_RECEIVED}`:
       return trackerPositionReceived(inistialState, action)
     break;  
    case `${actions.TRACKER_VALUES_RECEIVED}`:
        console.log(action)
        return trackerValuesReceived(inistialState, action)
    }
    return state
}