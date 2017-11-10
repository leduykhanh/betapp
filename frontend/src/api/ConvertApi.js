import * as constants from '../constants';
import serverCall from '../utils/serverCall';


export function lockRate(subscriptionId, data) {
  
  // const amount = (data.fromAmount && data.fromAmount > 0) ? data.fromAmount : data.toAmount;
  const amountType = data.amountType;
  const amount = amountType == 'FROM'? data.fromAmount: data.toAmount;
  const requestObj = {
    fromCurrency: data.fromCurrency,
    toCurrency: data.toCurrency,
    amount: amount,
    amountType: amountType
  };
  
  if (!requestObj.fromCurrency || !requestObj.toCurrency) {
    return new Error('Select currency');
  }
  
  return serverCall.post(constants.GET_WALLET_API + '/' + subscriptionId + '/lockrate', requestObj);
}

export function convert(subscriptionId, data) {
  return serverCall.post(constants.GET_WALLET_API + '/' + subscriptionId + '/convert', data);
}