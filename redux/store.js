

import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  users: userReducer,
});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

export default store;
