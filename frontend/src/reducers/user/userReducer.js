import { REHYDRATE } from 'redux-persist/constants';
import * as constant from '../../constants';
import moment from 'moment';

export function userReducer(state = constant.initalState.user, action) {
  
  switch (action.type) {
    
    case REHYDRATE: {
      return {
        ...action.payload.user,
        rehydated: true,
        error: null
      };
    }
  
    case constant.STATE_LOGIN_PENDING: {
      return {
        ...state,
        oidc: null,
        error: null,
        isLoggingIn: true
      };
    }
    
    case constant.STATE_LOGIN_SUCCESS: {
      return {
        ...state,
        oidc: action.payload,
        isLoggingIn: false,
        error: null,
        refreshTime: moment().add(constant.REFRESH_TOKEN_LIFESPAN, 's')
      };
    }
  
    case constant.STATE_LOGIN_ERROR: {
      return {
        ...state,
        oidc: null,
        error: action.error.message,
        isLoggingIn: false
      };
    }
  
    case constant.STATE_LOGOUT_SUCCESS: {
      return {
        ...constant.initalState.user,
        oidc: null,
        refreshTime: null
      };
    }
    
    case constant.STATE_REFRESH_PENDING: {
      return {
        ...state,
        isRefreshingToken: true,
      }
    }
  
    case constant.STATE_REFRESH_SUCCESS: {
      return {
        ...state,
        oidc: action.payload,
        isRefreshingToken: false,
        refreshTime: moment().add(constant.REFRESH_TOKEN_LIFESPAN, 's')
      }
    }
  
    case constant.STATE_REFRESH_ERROR: {
      return {
        ...state,
        isRefreshingToken: false
      }
    }
    
    default:
      return state;
  }
}