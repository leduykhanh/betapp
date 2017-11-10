import { Actions } from 'react-native-router-flux';
import { MessageBarManager } from 'react-native-message-bar';
import * as constants from '../constants';
import * as DepositApi from '../api/DepositApi';

export function deposit(subscriptionId, data) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_DEPOSIT_PENDING
    });
    
    const requestObj = {
        bankAccountId: data.bankAccountId,
        amount: data.amount,
        bankTransactionId: data.bankTransactionId,
        currency: data.currency
    };
    DepositApi.deposit(subscriptionId, requestObj).then((response) => {
      
      dispatch({
        type: constants.STATE_DEPOSIT_SUCCESS,
        payload: response.data.data
      });
    //   Actions.reset('dashboard');
      Actions.reset('deposit_success',{data:requestObj});
  
      MessageBarManager.showAlert({
        position: 'bottom',
        animationType: 'SlideFromLeft',
        title: 'Successful',
        message: 'Deposit request sent, Admin will process it shortly',
        duration: 3000,
        alertType: 'success'
      });
      
    }).catch((error) => {
      
      
      dispatch({
        type: constants.STATE_DEPOSIT_ERROR,
        error
      });
      
    });

  }
}

export function newDeposit(data) {
    return dispatch => {
      
      dispatch({
        type: constants.STATE_NEW_DEPOSIT,
        payload: data
      });
    }
};