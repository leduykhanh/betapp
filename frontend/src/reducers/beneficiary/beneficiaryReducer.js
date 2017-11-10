import * as constant from '../../constants';

export function beneficiaryReducer(state = constant.initalState.beneficiary, action) {
  
  switch (action.type) {
    
    case constant.STATE_GET_BENEFICIARY_PENDING: {
      return {
        ...state,
        isGetting: true,
      };
    }

    case constant.STATE_GET_BENEFICIARY_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isGetting: false,
        
      };
    }

    case constant.STATE_GET_BENEFICIARY_ERROR: {
        return {
            ...state,
            isGetting: false
        };
      }
    
    case constant.STATE_DELETE_BENEFICIARY_SUCCESS: {
        const beneficiaries = state.beneficiaries.filter(r => r.beneficiaryId !== action.payload);
        
        return {
          ...state,
          beneficiaries
        };
      }
        
      
    default:
      return state;
  }
}