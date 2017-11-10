import * as constants from '../constants';
import * as DeviceApi from '../api/DeviceApi';
import {setDeviceId} from '../utils/persistStore';
import { Platform, NativeModules } from 'react-native';

export function setToken(token) {
  return dispatch => {
    
    dispatch({
      type: constants.SET_PUSH_TOKEN,
      payload: token
    });

  }
}

export function sendToken(token){
  const locale = Platform.OS === "ios" ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;
  
  const data = {
    pushToken: token,
    osType: Platform.OS.toUpperCase(),
    language: locale
  };
  
  return dispatch => {
    DeviceApi.sendToken(data).then(response => {
     setDeviceId(response.data.deviceId);
     
     dispatch({
        type: constants.SET_DEVICE_ID,
        payload: (response.data.deviceId)
      });
      
    }).catch(error => dispatch({type:constants.SET_PUSH_TOKEN_FAIL}));
  }
  
}

export function updateToken(token, deviceId) {
  
  const locale = Platform.OS === "ios" ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;
  
  const data = {
    pushToken: token,
    osType: Platform.OS.toUpperCase(),
    language: locale,
    deviceId: deviceId
  };
  
  return dispatch => {
    DeviceApi.updateToken(data).then(response =>{
      
      setDeviceId(response.data.deviceId);
      
      dispatch({
        type: constants.SET_DEVICE_ID,
        payload: (response.data.deviceId)
      });
      
    }).catch(error => dispatch({type:constants.SET_PUSH_TOKEN_FAIL}));
  
  }
  
}