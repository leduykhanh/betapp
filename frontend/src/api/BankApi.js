import * as constants from '../constants';
import serverCall from '../utils/serverCall';


export function getBankList(subscriptionId, currency) {
  return serverCall.get(constants.GET_WALLET_API + '/' + subscriptionId + '/kokubank/' + currency);
}