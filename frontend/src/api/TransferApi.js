import * as constants from '../constants';
import serverCall from '../utils/serverCall';

export function transfer(subscriptionId, data) {
    return serverCall.post(constants.GET_WALLET_API + '/' + subscriptionId + '/transfer', data);
  }

export function transferCrossWallet(subscriptionId, data) {
    return serverCall.post(constants.GET_WALLET_API + '/' + subscriptionId + '/transfer/wallet/crossCurrency', data);
  }  

  export function transferCrossBank(subscriptionId, data) {
    return serverCall.post(constants.GET_WALLET_API + '/' + subscriptionId + '/transfer/bank/crossCurrency', data);
  }    