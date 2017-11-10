import { Actions } from 'react-native-router-flux';
import { MessageBarManager } from 'react-native-message-bar';
import * as constants from '../constants';
import * as ConvertApi from '../api/ConvertApi';

export function convert(subscriptionId, lockRateId) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_CONVERT_PENDING
    });
    
    ConvertApi.convert(subscriptionId, { lockRateId: lockRateId }).then((response) => {
      dispatch({
        type: constants.STATE_GET_CONVERT_SUCCESS,
        payload: response.data.data
      });

      Actions.replace('convert_success', {data:response.data.data});
        
      MessageBarManager.showAlert({
        position: 'bottom',
        animationType: 'SlideFromLeft',
        title: 'Successful',
        message: 'Converted',
        duration: 3000,
        alertType: 'success'
      });
    }).catch((error) => {
      dispatch({
        type: constants.STATE_GET_CONVERT_ERROR,
        error: error.response.data.message
      });
      
    });

  }
}

export function newConvert(data) {
    return dispatch => {
      
      dispatch({
        type: constants.STATE_NEW_CONVERT,
        payload: data
      });
    }
};