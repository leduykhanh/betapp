import {REHYDRATE} from 'redux-persist/constants';
import * as constant from '../../constants';

export function profileReducer(state = constant.initalState.profile, action) {
  
  switch (action.type) {
  
    case REHYDRATE: {
      return {
        ...action.payload.profile
      };
    }
    
    case constant.STATE_GET_PROFILE_PENDING: {
      return {
        isGettingProfile: true,
        isProfileLoadCalled: true
      };
    }

    case constant.STATE_GET_PROFILE_SUCCESS: {
      return {
        ...action.payload,
        isGettingProfile: false,
        selectedSubscription: action.payload.subscriptions ? action.payload.subscriptions[0] : null,
        isProfileLoadCalled: true
      };
    }

    case constant.STATE_GET_PROFILE_ERROR: {
      return {
        isGettingProfile: false,
        isProfileLoadCalled: true
      };
    }
  
    case constant.STATE_LOGOUT_SUCCESS: {
      return {
        ...constant.initalState.profile
      };
    }
      
    default:
      return state;
  }
}