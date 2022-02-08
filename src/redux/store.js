import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReduser from './redusers/rootReducer';

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


const store = createStore(
  rootReduser,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;