import * as constant from '../../constants';

export function ruleReducer(state = constant.initalState.rule, action) {
  
  switch (action.type) {
  
    case constant.STATE_GET_RULE_PENDING: {
      return {
        ...state,
        isGettingRule: true
      };
    }

    case constant.STATE_GET_RULE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isGettingRule: false
      };
    }

    case constant.STATE_GET_RULE_ERROR: {
      return {
        ...state,
        isGettingRule: false
      };
    }
  
    default:
      return state;
  }
}