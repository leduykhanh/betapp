
import * as constant from '../../constants';

export function depositReducer(state = constant.initalState.deposit, action) {
  switch (action.type) {
    case constant.STATE_NEW_DEPOSIT: {
      return {
        ...state,
        ...action.payload,
        isDepositting: false,
        isDepositted: false
      };
      }

    case constant.STATE_GET_DEPOSIT_PENDING: {
      return {
        ...state,
        isDepositting: true,
        isDepositted: false
      };
    }

    case constant.STATE_GET_DEPOSIT_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isDepositting: false,
        isDepositted: true
      };
    }

    case constant.STATE_GET_DEPOSIT_ERROR: {
      return {
        ...state,
        isDepositting: false
      };
    }
  
    case constant.STATE_LOGOUT_SUCCESS: {
      return {
        ...constant.initalState.transfer
      };
    }
    
    default:
      return state;
  }
}