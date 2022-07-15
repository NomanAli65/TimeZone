import { combineReducers } from 'redux';

import Auth from './AuthReducer';
import Alert from "./AlertReducers";
import GeneralReducer from "./GeneralReducer";
import Product from "./ProductReducer";
import User from "./UserReducer";

export default combineReducers({
  Auth,
  Alert,
  GeneralReducer,
  Product,
  User
});

