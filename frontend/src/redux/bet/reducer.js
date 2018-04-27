import Store from './store';

// Set initial state
export const initialState = Store;

export default function betReducer(state = initialState, action) {
  switch (action.type) {
    case 'BET_FETCHED': 
      return {
        ...state,
        bets: action.data || []
      }
    
    default:
      return state;
  }
}