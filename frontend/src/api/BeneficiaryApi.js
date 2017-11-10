import * as constants from '../constants';
import serverCall from '../utils/serverCall';


export function getBeneficiaryList(subscriptionId) {
  return serverCall.get(constants.GET_WALLET_API + '/' + subscriptionId + '/beneficiary');
}

export function createBeneficiary(subscriptionId, data) {
  return serverCall.post(constants.GET_WALLET_API + '/' + subscriptionId + '/beneficiary', data);
}

export function updateBeneficiary(subscriptionId, beneficiaryId, data) {
  return serverCall.put(constants.GET_WALLET_API + '/' + subscriptionId + '/beneficiary/' + beneficiaryId);
}

export function deleteBeneficiary(subscriptionId, beneficiaryId) {
  return serverCall.delete(constants.GET_WALLET_API + '/' + subscriptionId + '/beneficiary/' + beneficiaryId);
}