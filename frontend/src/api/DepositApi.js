import * as constants from '../constants';
import serverCall from '../utils/serverCall';

export function deposit(subscriptionId, data) {
    return serverCall.post(constants.GET_WALLET_API + '/' + subscriptionId + '/deposit', data);
  }