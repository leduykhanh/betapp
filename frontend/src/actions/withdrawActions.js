import { Actions } from 'react-native-router-flux';
import { MessageBarManager } from 'react-native-message-bar';
import * as constants from '../constants';
import * as WithdrawApi from '../api/WithdrawApi';

export function withdraw(subscriptionId, data) {

  return dispatch => {
    
    dispatch({
      type: constants.STATE_WITHDRAW_PENDING
    });
    
    const requestObj = {
        currency: data.fromCurrency,
        amount: data.fromAmount,
        beneficiaryId: data.beneficiaryId
    };

    WithdrawApi.withdraw(subscriptionId, requestObj).then((response) => {
      
      dispatch({
        type: constants.STATE_WITHDRAW_SUCCESS,
        payload: response.data.data
      });
      
      let newData = {...data,...response.data};

      Actions.replace('withdraw_success', {data:newData});
  
      MessageBarManager.showAlert({
        position: 'bottom',
        animationType: 'SlideFromLeft',
        title: 'Successful',
        message: 'withdraw request sent, Admin will process it shortly',
        duration: 3000,
        alertType: 'success'
      });
      
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_WITHDRAW_ERROR,
        error
      });
      
    });

  }
}

export function newwithdraw(data) {
    return dispatch => {
      
      dispatch({
        type: constants.STATE_NEW_withdraw,
        payload: data
      });
    }
};