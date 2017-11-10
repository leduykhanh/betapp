import * as constants from '../constants';
import serverCall from '../utils/serverCall';

export function getKokuRate() {
  return serverCall.get(constants.GET_KOKU_RATE_API);
}