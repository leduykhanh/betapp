import * as constant from '../../constants';

export function rateReducer(state = constant.initalState.rate, action) {
  
  switch (action.type) {
  
    case constant.STATE_GET_RATE_PENDING: {
      return {
        ...state,
        isGettingRate: true
      };
    }

    case constant.STATE_GET_RATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isGettingRate: false
      };
    }

    case constant.STATE_GET_RATE_ERROR: {
      return {
        ...state,
        isGettingRate: false
      };
    }
  
    default:
      return state;
  }
}