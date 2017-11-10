import * as constants from '../constants';
import serverCall from '../utils/serverCall';


export function getWallet(subscriptionId) {
  return serverCall.get(constants.GET_WALLET_API + '/' + subscriptionId);
}

export function getTransactionHistory(subscriptionId, startingIndex=0, pageSize=10) {
    return serverCall.get(constants.GET_WALLET_API + '/' + subscriptionId + '/history?startingindex='+ startingIndex+'&pagesize='+pageSize);
  }

