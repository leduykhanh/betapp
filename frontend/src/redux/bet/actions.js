
import serverCall from '../utils/serverCall';
import {BET_API} from '../../constants';

export function getBets(dispatch){
  serverCall.get(BET_API).then(
    ({data}) => dispatch({
          type: 'BET_FETCHED',
          data: data
    })
  );
}