import * as constant from '../../constants';

export function recipientReducer(state = constant.initalState.recipient, action) {
  
  switch (action.type) {
    
    case constant.STATE_GET_RECIPIENT_PENDING: {
      return {
        ...state,
        isGetting: true
      };
    }

    case constant.STATE_GET_RECIPIENT_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isGetting: false
      };
    }

    case constant.STATE_GET_RECIPIENT_ERROR: {
      return {
           ...state,
          isGetting: false
      };
    }
  
    case constant.STATE_LOGOUT_SUCCESS: {
      return {
        ...constant.initalState.recipient
      };
    }

    case constant.STATE_ADD_RECIPIENT_SUCCESS: {
      
      let recipients = state.recipients;
      
      recipients.push(action.payload);
      
      return {
        ...state,
        recipients: recipients,
        isAdding: false,
        error: null
      };
    }

    case constant.STATE_ADD_RECIPIENT_PENDING: {
      return {
          ...state,
          isAdding: true,
          error: null
      };
    } 
    
    case constant.STATE_ADD_RECIPIENT_ERROR: {
      return {
          ...state,
          isAdding: false,
          error: action.error
      };
    }
    
    case constant.STATE_DELETE_RECIPIENT_SUCCESS: {
      const recipients = state.recipients.filter(r => r.recipientId !== action.payload);
      
      return {
        ...state,
        recipients
      };
    }
    
    default:
      return state;
  }
}