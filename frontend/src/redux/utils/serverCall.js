import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import {setOidc} from '../utils/persistStore';
import { AsyncStorage } from 'react-native';

const serverCall = axios.create({
  timeout: 60000,
  maxRedirects: 10,
  maxContentLength: 50 * 1000 * 1000
});


serverCall.interceptors.response.use(response => {
  //console.log(response.config.url, response.data, response);
  return response;
}, error => {
  
  const { code, message } = error.response.data;
  
  //console.log('HTTP Error Response', error, error.response);
  
  if (error.response.status === 400) {
    return Promise.reject(error);
  }
  
  // if (error.response.status === 401 || error.response.status === 403) {
  //   Actions.popTo('login');
  //   return;
  // }
  serverCall.defaults.headers['Authorization'] = '';
  
  AsyncStorage.clear();
  setOidc(null);
  
  Actions.replace('login',{error: true});

  
  
  // MessageBarManager.showAlert({
  //   position: 'bottom',
  //   animationType: 'SlideFromLeft',
  //   title: 'Error found',
  //   message: `${code} - ${message}`,
  //   duration: 3000,
  //   alertType: 'error'
  // });
  
});

export default serverCall;