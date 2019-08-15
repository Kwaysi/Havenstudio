import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Packages from './PackageReducer';
import Booking from './BookingReducer';
import Subscription from './SubscriptionReducer';

const rootReducer = combineReducers({
  Auth,
  Packages,
  Booking,
  Subscription
});

export default rootReducer;
