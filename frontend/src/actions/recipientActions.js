import * as constants from '../constants';
import * as RecipientApi from '../api/RecipientApi';
import { Actions } from 'react-native-router-flux';
import { MessageBarManager } from 'react-native-message-bar';

export function getRecipientList(subscriptionId) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_RECIPIENT_PENDING
    });
  
    RecipientApi.getRecipientList(subscriptionId).then((response) => {
      
      dispatch({
        type: constants.STATE_GET_RECIPIENT_SUCCESS,
        payload: response.data
      });
      
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_GET_RECIPIENT_ERROR,
        error
      });
      
    });

  }
}

export function createRecipient(subscriptionId, data) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_ADD_RECIPIENT_PENDING
    });
  
    RecipientApi.createRecipient(subscriptionId, data).then((response) => {
      
      Actions.replace('beneficiary_list');
      Actions.refresh();
      
      dispatch({
        type: constants.STATE_ADD_RECIPIENT_SUCCESS,
        payload: response.data
      });
      
      MessageBarManager.showAlert({
        position: 'bottom',
        animationType: 'SlideFromLeft',
        title: 'Successful',
        message: 'New Recipient added',
        duration: 3000,
        alertType: 'success'
      });
      
    }).catch((error) => {
      dispatch({
        type: constants.STATE_ADD_RECIPIENT_ERROR,
        error: error.response.data.message
      });
      
    });

  }
}

export function deleteRecipient(subscriptionId, recipientId) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_DELETE_RECIPIENT_PENDING
    });
  
    RecipientApi.deleteRecipient(subscriptionId, recipientId).then((response) => {
      
      Actions.pop();
      Actions.refresh();
      
      dispatch({
        type: constants.STATE_DELETE_RECIPIENT_SUCCESS,
        payload: recipientId
      });
      
      MessageBarManager.showAlert({
        position: 'bottom',
        animationType: 'SlideFromLeft',
        title: 'Successful',
        message: 'Recipient removed',
        duration: 3000,
        alertType: 'success'
      });
      
    }).catch((error) => {

      dispatch({
        type: constants.STATE_DELETE_RECIPIENT_ERROR,
        error
      });

      
    });

  }
}