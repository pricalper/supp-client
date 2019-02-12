import reducer from './Reducers/rootReducer';
import {applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store =  process.env.NODE_ENV === 'development' 
? createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, logger), 
  ) 
: createStore(
    reducer,
    applyMiddleware(thunk), 
  );
  
  export default store;