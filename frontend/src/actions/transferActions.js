import { Actions } from 'react-native-router-flux';
import { MessageBarManager } from 'react-native-message-bar';
import * as constants from '../constants';
import * as TransferApi from '../api/TransferApi';

export function transfer(subscriptionId, data) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_TRANSFER_PENDING
    });
    
    const requestObj = {
      walletDetailId: data.walletDetailId,
      amount: data.amount,
      recipientId: data.recipientId
    };
    
    TransferApi.transfer(subscriptionId, requestObj).then((response) => {
      
      dispatch({
        type: constants.STATE_GET_TRANSFER_SUCCESS,
        payload: response.data
      });
      
      Actions.replace('transfer_success', {data:response.data.data});

      MessageBarManager.showAlert({
        position: 'bottom',
        animationType: 'SlideFromLeft',
        title: 'Successful',
        message: 'Transfer request sent',
        duration: 3000,
        alertType: 'success'
      });
      
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_GET_TRANSFER_ERROR,
        error
      });
      
    });

  }
}

export function newTransfer(data) {
    return dispatch => {
      
      dispatch({
        type: constants.STATE_NEW_TRANSFER,
        payload: data
      });
    }
};

export function transferCrossWallet(subscriptionId, data) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_TRANSFER_PENDING
    });
    
    const requestObj = {
      lockRateId: data.lockRateId,
      recipientId: data.recipientId
    };
    
    TransferApi.transferCrossWallet(subscriptionId, requestObj).then((response) => {
      
      dispatch({
        type: constants.STATE_GET_TRANSFER_SUCCESS,
        payload: response.data
      });

      
      Actions.replace('transfer_success', {data:response.data});
  
      MessageBarManager.showAlert({
        position: 'bottom',
        animationType: 'SlideFromLeft',
        title: 'Successful',
        message: 'Transfer request sent',
        duration: 3000,
        alertType: 'success'
      });
      
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_GET_TRANSFER_ERROR,
        error
      });
      
    });

  }
}

export function transferCrossBank(subscriptionId, data) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_TRANSFER_PENDING
    });
    
    const requestObj = {
      lockRateId: data.lockRateId,
      beneficiaryId: data.beneficiaryId
    };
    
    TransferApi.transferCrossBank(subscriptionId, requestObj).then((response) => {
      
      dispatch({
        type: constants.STATE_GET_TRANSFER_SUCCESS,
        payload: response.data.data
      });
      
      let newData = {...data,referenceNo:response.data.number};
      
      Actions.replace('withdraw_success', {data:newData});
      
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_GET_TRANSFER_ERROR,
        error
      });
      
    });

  }
}