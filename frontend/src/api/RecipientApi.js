import * as constants from '../constants';
import serverCall from '../utils/serverCall';


export function getRecipientList(subscriptionId) {
  return serverCall.get(constants.GET_WALLET_API + '/' + subscriptionId + '/recipient');
}

export function createRecipient(subscriptionId, data) {
  return serverCall.post(constants.GET_WALLET_API + '/' + subscriptionId + '/recipient', data);
}

export function deleteRecipient(subscriptionId, recipientId) {
  return serverCall.delete(constants.GET_WALLET_API + '/' + subscriptionId + '/recipient/' + recipientId);
}