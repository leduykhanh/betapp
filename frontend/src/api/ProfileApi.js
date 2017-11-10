import * as constants from '../constants';
import serverCall from '../utils/serverCall';

export function getFullProfile() {
  return serverCall.get(constants.GET_PROFILE_API);
}