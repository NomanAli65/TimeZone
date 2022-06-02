import {combineReducers} from 'redux';

import Auth from './AuthReducer';
import Alert from "./AlertReducers";

export default combineReducers({
  Auth,
  Alert
});

