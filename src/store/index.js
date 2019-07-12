import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import weatherReducer from "./reducers/Weather";
import metricsReducer from "./reducers/Metrics";
import tubingReducer from "./reducers/TubingPressure";
import casingReducer from "./reducers/CasingPressure";
export default () => {
  const rootReducer = combineReducers({
    weather: weatherReducer,
    metrics: metricsReducer,
    tube: tubingReducer,
    casing: casingReducer
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, composeEnhancers(middlewares));

  sagas.forEach(sagaMiddleware.run);

  return store;
};
