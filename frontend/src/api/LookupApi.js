import * as constants from '../constants';
import serverCall from '../utils/serverCall';


export function getLookupData() {
  return serverCall.get(constants.GET_LOOKUP_API);
}