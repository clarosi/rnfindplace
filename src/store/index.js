import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
//import { watchLoginUser } from './sagas';

//const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;
if (__DEV__) {
  // react-native-debugger
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//sagaMiddleware.run(watchLoginUser);

export default store;
