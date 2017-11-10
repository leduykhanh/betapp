
import * as constant from '../../constants';

export function convertReducer(state = constant.initalState.convert, action) {
  switch (action.type) {
    case constant.STATE_NEW_CONVERT: {
      return {
        ...state,
        ...action.payload,
        isConverting: false,
        isConverted: false,
        error:null
      };
      }

    case constant.STATE_GET_CONVERT_PENDING: {
      return {
        ...state,
        error:null,
        isConverting: true,
        isConverted: false
      };
    }

    case constant.STATE_GET_CONVERT_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error:null,
        isConverting: false,
        isConverted: true
      };
    }

    case constant.STATE_GET_CONVERT_ERROR: {
      return {
        ...state,
        error: action.error,
        isConverting: false
      };
    }
  
    case constant.STATE_LOGOUT_SUCCESS: {
      return {
        ...constant.initalState.convert
      };
    }
    
    default:
      return state;
  }
}