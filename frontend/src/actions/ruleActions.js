import * as constants from '../constants';
import * as RuleApi from '../api/RuleApi';

export function getRules(subscriptionId) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_RULE_PENDING
    });
  
    RuleApi.getRules(subscriptionId).then((response) => {
      
      dispatch({
        type: constants.STATE_GET_RULE_SUCCESS,
        payload: response.data
      });
      
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_GET_RULE_ERROR,
        error
      });
      
    });

  }
}