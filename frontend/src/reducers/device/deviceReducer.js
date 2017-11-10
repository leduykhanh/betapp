import * as constant from '../../constants';
import {REHYDRATE} from 'redux-persist/constants';

export function deviceReducer(state = constant.initalState.device, action) {
  
  switch (action.type) {
      
    case REHYDRATE: {
      return {
        ...action.payload.device,
        rehydated: true
      };
    }
    
    case constant.SET_PUSH_TOKEN: {
      return {
        ...state,
        token: action.payload
      };
    }

    case constant.SET_DEVICE_ID: {
      return {
        ...state,
        deviceId: action.payload
      };
    }
  
    default:
      return state;
  }
}