import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Packages from './PackageReducer';
import Booking from './BookingReducer';

const rootReducer = combineReducers({
  Auth,
  Packages,
  Booking
});

export default rootReducer;
