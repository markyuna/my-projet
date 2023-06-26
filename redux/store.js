

import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';
import userInfoReducer from './reducers/userInfoReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  users: appReducer,
  infos: userInfoReducer,
});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

export default store;
