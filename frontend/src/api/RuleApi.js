import * as constants from '../constants';
import serverCall from '../utils/serverCall';


export function getRules(subscriptionId) {
  return serverCall.get(constants.GET_WALLET_API + '/' + subscriptionId + '/rule');
}