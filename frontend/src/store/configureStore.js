import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import setAuthenticationHeaderMiddleware from '../middleware/setAuthHeaderMiddleware';
import reducers from '../reducers';
import {initalState} from '../constants';

//delete GLOBAL.XMLHttpRequest;

export default async function configureStore() {
  
  const config = {
    storage: AsyncStorage,
    keyPrefix: 'koku:'
  };
  
  const middleware = applyMiddleware(thunk, setAuthenticationHeaderMiddleware);
  
  const enhancer = compose(middleware, autoRehydrate());
  
  const store = createStore(reducers, undefined, enhancer);
  
  await persistStore(store, config);
  
  return store;
}