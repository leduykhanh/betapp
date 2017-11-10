import moment from 'moment';
import serverCall from '../utils/serverCall';
import { refreshToken } from '../api/UserApi';
import * as constants from '../constants';
import {setOidc} from '../utils/persistStore';

let refreshingToken = false;

export default setAuthenticationHeader = store => next => action => {
  
  if (refreshingToken === true) {
    next(action);
  }
  
  const { user } = store.getState(),
        { oidc } = user;

  if (oidc && oidc.access_token && !serverCall.defaults.headers['Authorization']) {
    serverCall.defaults.headers['Authorization'] = 'Bearer ' + oidc.access_token;
  }

  if (oidc && user.isRefreshingToken === false && moment().diff(user.refreshTime, 's') > -1) {
    refreshTokenCall(store.dispatch, oidc.refresh_token);
  }

  next(action);
};

function refreshTokenCall(dispatch, refresh_token:string) {
  refreshingToken = true;
  
  dispatch({
    type: constants.STATE_REFRESH_PENDING
  });
  
  refreshToken(refresh_token).then(response => {
    
    setOidc(response.data);
    
    dispatch({
      type: constants.STATE_REFRESH_SUCCESS,
      payload: response.data
    });
    
    refreshingToken = false;
    
  }).catch(error => {
    refreshingToken = false;
    dispatch({
      type: constants.STATE_REFRESH_ERROR,
      error
    });
  });
}
