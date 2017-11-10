import * as constants from '../constants';
import * as profileApi from '../api/ProfileApi';
import { getWallet } from './walletActions';
import { getRecipientList } from './recipientActions';
import { getTransactionHistory } from './walletActions';
import { getKokuRate } from './rateActions';
import { getRules } from './ruleActions';

export function getFullProfile() {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_PROFILE_PENDING
    });
  
    profileApi.getFullProfile().then((response) => {
      
      const { data } = response.data;
      
      dispatch({
        type: constants.STATE_GET_PROFILE_SUCCESS,
        payload: data
      });
      
      if (data.subscriptions.length > 0) {
        let firstSub = data.subscriptions[0];
        dispatch(getWallet(firstSub.subscriptionId));
        dispatch(getRecipientList(firstSub.subscriptionId));
        dispatch(getTransactionHistory(firstSub.subscriptionId));
        dispatch(getKokuRate());
        dispatch(getRules(firstSub.subscriptionId));
      }
      
    }).catch((error) => {
      dispatch({
        type: constants.STATE_GET_PROFILE_ERROR,
        error
      });
      
    });

  }
}