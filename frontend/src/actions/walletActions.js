import * as constants from '../constants';
import * as WalletApi from '../api/WalletApi';

export function getWallet(subscriptionId) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_WALLET_PENDING
    });
  
    WalletApi.getWallet(subscriptionId).then((response) => {
      dispatch({
        type: constants.STATE_GET_WALLET_SUCCESS,
        payload: response.data
      });
      
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_GET_WALLET_ERROR,
        error
      });
      
    });

  }
}

export function getTransactionHistory(subscriptionId, startingIndex, pageSize = 10) {
    return dispatch => {
      
      dispatch({
        type: constants.STATE_GET_TRANSACTION_PENDING
      });
    
      WalletApi.getTransactionHistory(subscriptionId, startingIndex, pageSize).then((response) => {
        
        // const transactions = response.data.transactions.map((item, i) => {
        //   item.index = i + startingIndex;
        //   return item;
        // });
        
        dispatch({
          type: constants.STATE_GET_TRANSACTION_SUCCESS,
          payload: {
            transactions: response.data.transactions,
            total: response.data.total,
            startingIndex}
        });
        
      }).catch((error) => {
        dispatch({
          type: constants.STATE_GET_TRANSACTION_ERROR,
          error
        });
        
      });
  
    }
  }