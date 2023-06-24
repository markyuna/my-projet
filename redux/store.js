


import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  users: appReducer,
});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

export default store;