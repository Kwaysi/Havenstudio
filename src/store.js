import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers/index';

const composeEnhancers = composeWithDevTools({});

export default function configureStore() {
  const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));
  return store;
}