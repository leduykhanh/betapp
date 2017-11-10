import { combineReducers } from 'redux';
import { userReducer } from './user/userReducer';
import { profileReducer } from './profile/profileReducer';
import { walletReducer } from './wallet/walletReducer';
import { lookupReducer } from './lookup/lookupReducer';
import { recipientReducer } from './recipient/recipientReducer';
import { transferReducer } from './transfer/transferReducer';
import { beneficiaryReducer } from './beneficiary/beneficiaryReducer';
import { rateReducer } from './rate/rateReducer';
import { depositReducer } from './deposit/depositReducer';
import { convertReducer } from './convert/convertReducer';
import { ruleReducer } from './rule/ruleReducer';
import { deviceReducer } from './device/deviceReducer';

const reducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  wallet: walletReducer,
  lookup: lookupReducer,
  recipient: recipientReducer,
  transfer: transferReducer,
  beneficiary: beneficiaryReducer,
  rate: rateReducer,
  deposit: depositReducer,
  convert: convertReducer,
  rule: ruleReducer,
  device : deviceReducer
});

export default reducers;