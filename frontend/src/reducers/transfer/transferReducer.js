
import * as constant from '../../constants';

export function transferReducer(state = constant.initalState.transfer, action) {
  switch (action.type) {
    case constant.STATE_NEW_TRANSFER: {
      return {
        ...state,
        ...action.payload,
        isTransferring: false,
        isTransferred: false
      };
      }

    case constant.STATE_GET_TRANSFER_PENDING: {
      return {
        ...state,
        isTransferring: true,
        isTransferred: false
      };
    }

    case constant.STATE_GET_TRANSFER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isTransferring: false,
        isTransferred: true
      };
    }

    case constant.STATE_GET_TRANSFER_ERROR: {
      return {
        ...state,
        isTransferring: false
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