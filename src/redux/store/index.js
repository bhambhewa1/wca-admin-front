import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer";
// import thunkMiddleware from 'redux-thunk'
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export default store;
