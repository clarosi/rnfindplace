import { combineReducers } from 'redux';

import authReducer from './auth';
import placeReducer from './place';

const rootReducer = combineReducers({
  auth: authReducer,
  place: placeReducer
});

export default rootReducer;
