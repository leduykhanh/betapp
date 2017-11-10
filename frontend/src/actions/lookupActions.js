import * as constants from '../constants';
import * as LookupApi from '../api/LookupApi';

export function getLookupData() {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_LOOKUP_PENDING
    });
  
    LookupApi.getLookupData().then((response) => {
      dispatch({
        type: constants.STATE_GET_LOOKUP_SUCCESS,
        payload: response.data
      });
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_GET_LOOKUP_ERROR,
        error
      });
      
    });

  }
}