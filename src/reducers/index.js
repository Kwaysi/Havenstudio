import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Packages from './PackageReducer';

const rootReducer = combineReducers({
  Auth,
  Packages
});

export default rootReducer;
