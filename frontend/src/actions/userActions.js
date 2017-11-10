import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as constants from '../constants';
import * as userApi from '../api/UserApi';
import serverCall from '../utils/serverCall';
import * as profileActions from './profileActions';

import {setOidc} from '../utils/persistStore';

export function login(username:string, password:string) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_LOGIN_PENDING
    });
  
    userApi.login(username, password)
      .then((response) => {
  
        setOidc(response.data);
        
        dispatch({
          type: constants.STATE_LOGIN_SUCCESS,
          payload: response.data
        });
        
        serverCall.defaults.headers['Authorization'] = 'Bearer ' + response.data.access_token;
        
        dispatch(profileActions.getFullProfile());
        Actions.reset('drawer');
      
    }).catch((error) => {

      //console.log(error,error.response);
      
      dispatch({
        type: constants.STATE_LOGIN_ERROR,
        error: {message:`Invalid Username or Password`}
      });
      
    });

  }
}

export function logout() {
  return dispatch => {
    
    AsyncStorage.clear();
    setOidc(null);
  
    serverCall.defaults.headers['Authorization'] = '';
    
    dispatch({
      type: constants.STATE_LOGOUT_SUCCESS
    });
  
    Actions.replace('login');
  }
}