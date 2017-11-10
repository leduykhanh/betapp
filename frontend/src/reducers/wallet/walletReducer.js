import * as constant from '../../constants';

export function walletReducer(state = constant.initalState.wallet, action) {
  switch (action.type) {
    
    case constant.STATE_GET_WALLET_PENDING: {
      return {
        ...state,
        isFetching: true
      };
    }

    case constant.STATE_GET_WALLET_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      };
    }

    case constant.STATE_GET_WALLET_ERROR: {
      return {
          isFetching: false
      };
    }
  
    case constant.STATE_LOGOUT_SUCCESS: {
      return {
        ...constant.initalState.wallet
      };
    }

    case constant.STATE_GET_TRANSACTION_PENDING: {
      return {
        ...state,
        isFetching: true
      };
    }

    case constant.STATE_GET_TRANSACTION_SUCCESS: {

      const transactions = action.payload.startingIndex && action.payload.startingIndex > 0 ?
        state.transactions.concat(action.payload.transactions) :
        action.payload.transactions ;
      
      return {
        ...state,
        ...action.payload,
        transactions:transactions,
        isFetching: false,
        total: action.payload.total
      };
    }

    case constant.STATE_GET_TRANSACTION_ERROR: {
      return {
          isFetching: false
      };
    }
    
    default:
      return state;
  }
}