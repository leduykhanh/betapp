import * as constants from '../constants';
import * as rateApi from '../api/RateApi';

export function getKokuRate() {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_RATE_PENDING
    });
  
    rateApi.getKokuRate().then((response) => {
      
      const { data } = response;
      dispatch({
        type: constants.STATE_GET_RATE_SUCCESS,
        payload: data
      });
      
     
    }).catch((error) => {
      dispatch({
        type: constants.STATE_GET_RATE_ERROR,
        error
      });
      
    });

  }
}