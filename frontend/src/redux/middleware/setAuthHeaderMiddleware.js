import moment from 'moment';
import serverCall from '../utils/serverCall';

let refreshingToken = false;

export default setAuthenticationHeader = store => next => action => {
  

  
  const { user } = store.getState();

  if (user && user.token && !serverCall.defaults.headers['Authorization']) {
    serverCall.defaults.headers['Authorization'] = 'Bearer ' + user.token;
  }

  next(action);
};


