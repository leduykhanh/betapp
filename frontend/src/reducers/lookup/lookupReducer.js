import * as constant from '../../constants';

export function lookupReducer(state = constant.initalState.lookup, action) {
  
  switch (action.type) {
    
    case constant.STATE_GET_LOOKUP_PENDING: {
      return {
        isGetting: true
      };
    }

    case constant.STATE_GET_LOOKUP_SUCCESS: {
      let countries = action.payload.countries;
      countries.sort((a,b) => (a.name > b.name)?1:(a.name<b.name?-1:0))
      return {
        ...action.payload,
        countries: countries,
        isGetting: false
      };
    }

    case constant.STATE_GET_LOOKUP_ERROR: {
        return {
            isGetting: false
        };
      }
      
    default:
      return state;
  }
}