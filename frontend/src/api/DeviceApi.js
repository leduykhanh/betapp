import * as constants from '../constants';
import serverCall from '../utils/serverCall';


export function sendToken(data) {
  return serverCall.post(constants.DEVICE_API, data);
}
export function updateToken(data) {
  return serverCall.put(constants.DEVICE_API, data);
}