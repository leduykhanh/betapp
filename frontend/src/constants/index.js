export const NUMBER_ACTIVITIES_ON_DASHBOARD = 10;

const apiVersion = 'v0.2';

// Staging
// const BASE_API_URL = 'https://app.quentino.koku.io/api/v0.2';
// export const LOGIN_API = 'https://auth.quentino.koku.io/core/connect/token';

// Development
// const BASE_API_URL = 'https://kokudevweb.azurewebsites.net/api/' + apiVersion;
// export const LOGIN_API = 'https://kokudevidserver.azurewebsites.net/core/connect/token';

// Production
const BASE_API_URL = 'https://app.koku.io/api/v0.2';
export const LOGIN_API = 'https://auth.koku.io/core/connect/token';

const MOCK_API_URL = 'http://private-e9ba99-kokudev.apiary-mock.com';

export const GET_PROFILE_API = BASE_API_URL + '/profile';
export const GET_WALLET_API = BASE_API_URL + '/wallet';
export const MOCK_GET_WALLET_API = MOCK_API_URL + '/wallet';
export const GET_LOOKUP_API = BASE_API_URL + '/lookup';
export const GET_BANK_LIST_API = BASE_API_URL + '/koku/bankaccount';
export const GET_KOKU_RATE_API = BASE_API_URL + '/rate';
export const DEVICE_API = BASE_API_URL + '/device';

// export const KOKU_LOGO_URL = 'https://d1qb2nb5cznatu.cloudfront.net/startups/i/3362811-ac1ddb13d4bb672de6550c6ab1078968-medium_jpg.jpg?buster=1498795012';
export const KOKU_LOGO_URL = '../../assets/images/logo.jpg';
export const REFRESH_TOKEN_LIFESPAN = 100; // In seconds
export const KEYBOARD_IDLE_TIME = 1000;

export const STATE_LOGIN_PENDING = 'STATE_LOGIN_PENDING';
export const STATE_LOGIN_ERROR = 'STATE_LOGIN_ERROR';
export const STATE_LOGIN_SUCCESS = 'STATE_LOGIN_SUCCESS';
export const STATE_LOGOUT_SUCCESS = 'STATE_LOGOUT_SUCCESS';

export const STATE_REFRESH_PENDING = 'STATE_REFRESH_PENDING';
export const STATE_REFRESH_SUCCESS = 'STATE_REFRESH_SUCCESS';
export const STATE_REFRESH_ERROR = 'STATE_REFRESH_ERROR';

export const STATE_GET_PROFILE_PENDING = 'STATE_GET_PROFILE_PENDING';
export const STATE_GET_PROFILE_SUCCESS = 'STATE_GET_PROFILE_SUCCESS';
export const STATE_GET_PROFILE_ERROR = 'STATE_GET_PROFILE_ERROR';


export const STATE_GET_WALLET_PENDING = 'STATE_GET_WALLET_PENDING';
export const STATE_GET_WALLET_SUCCESS = 'STATE_GET_WALLET_SUCCESS';
export const STATE_GET_WALLET_ERROR = 'STATE_GET_WALLET_ERROR';


export const STATE_GET_LOOKUP_PENDING = 'STATE_GET_LOOKUP_PENDING';
export const STATE_GET_LOOKUP_SUCCESS = 'STATE_GET_LOOKUP_SUCCESS';
export const STATE_GET_LOOKUP_ERROR = 'STATE_GET_LOOKUP_ERROR';

export const STATE_GET_RECIPIENT_PENDING = 'STATE_GET_RECIPIENT_PENDING';
export const STATE_GET_RECIPIENT_SUCCESS = 'STATE_GET_RECIPIENT_SUCCESS';
export const STATE_GET_RECIPIENT_ERROR = 'STATE_GET_RECIPIENT_ERROR';

export const STATE_ADD_RECIPIENT_PENDING = 'STATE_ADD_RECIPIENT_PENDING';
export const STATE_ADD_RECIPIENT_SUCCESS = 'STATE_ADD_RECIPIENT_SUCCESS';
export const STATE_ADD_RECIPIENT_ERROR = 'STATE_ADD_RECIPIENT_ERROR';

export const STATE_DELETE_RECIPIENT_PENDING = 'STATE_DELETE_RECIPIENT_PENDING';
export const STATE_DELETE_RECIPIENT_SUCCESS = 'STATE_DELETE_RECIPIENT_SUCCESS';
export const STATE_DELETE_RECIPIENT_ERROR = 'STATE_DELETE_RECIPIENT_ERROR';

export const STATE_GET_TRANSFER_PENDING = 'STATE_GET_TRANSFER_PENDING';
export const STATE_GET_TRANSFER_SUCCESS = 'STATE_GET_TRANSFER_SUCCESS';
export const STATE_GET_TRANSFER_ERROR = 'STATE_GET_TRANSFER_ERROR';
export const STATE_NEW_TRANSFER = 'STATE_NEW_TRANSFER';

export const STATE_DEPOSIT_PENDING = 'STATE_DEPOSIT_PENDING';
export const STATE_DEPOSIT_SUCCESS = 'STATE_DEPOSIT_SUCCESS';
export const STATE_DEPOSIT_ERROR = 'STATE_DEPOSIT_ERROR';
export const STATE_NEW_DEPOSIT = 'STATE_NEW_DEPOSIT';

export const STATE_WITHDRAW_PENDING = 'STATE_WITHDRAW_PENDING';
export const STATE_WITHDRAW_SUCCESS = 'STATE_WITHDRAW_SUCCESS';
export const STATE_WITHDRAW_ERROR = 'STATE_WITHDRAW_ERROR';
export const STATE_NEW_WITHDRAW = 'STATE_NEW_WITHDRAW';

export const STATE_GET_CONVERT_PENDING = 'STATE_GET_CONVERT_PENDING';
export const STATE_GET_CONVERT_SUCCESS = 'STATE_GET_CONVERT_SUCCESS';
export const STATE_GET_CONVERT_ERROR = 'STATE_GET_CONVERT_ERROR';
export const STATE_NEW_CONVERT = 'STATE_NEW_CONVERT';

export const STATE_GET_BENEFICIARY_PENDING = 'STATE_GET_BENEFICIARY_PENDING';
export const STATE_GET_BENEFICIARY_SUCCESS = 'STATE_GET_BENEFICIARY_SUCCESS';
export const STATE_GET_BENEFICIARY_ERROR = 'STATE_GET_BENEFICIARY_ERROR';

export const STATE_ADD_BENEFICIARY_PENDING = 'STATE_ADD_BENEFICIARY_PENDING';
export const STATE_ADD_BENEFICIARY_SUCCESS = 'STATE_ADD_BENEFICIARY_SUCCESS';
export const STATE_ADD_BENEFICIARY_ERROR = 'STATE_ADD_BENEFICIARY_ERROR';

export const STATE_DELETE_BENEFICIARY_PENDING = 'STATE_DELETE_BENEFICIARY_PENDING';
export const STATE_DELETE_BENEFICIARY_SUCCESS = 'STATE_DELETE_BENEFICIARY_SUCCESS';
export const STATE_DELETE_BENEFICIARY_ERROR = 'STATE_DELETE_BENEFICIARY_ERROR';

export const STATE_GET_TRANSACTION_PENDING = 'STATE_GET_TRANSACTION_PENDING';
export const STATE_GET_TRANSACTION_SUCCESS = 'STATE_GET_TRANSACTION_SUCCESS';
export const STATE_GET_TRANSACTION_ERROR = 'STATE_GET_TRANSACTION_ERROR';

export const STATE_GET_RATE_PENDING = 'STATE_GET_RATE_PENDING';
export const STATE_GET_RATE_SUCCESS = 'STATE_GET_RATE_SUCCESS';
export const STATE_GET_RATE_ERROR = 'STATE_GET_RATE_ERROR';

export const STATE_GET_RULE_PENDING = 'STATE_GET_RULE_PENDING';
export const STATE_GET_RULE_SUCCESS = 'STATE_GET_RULE_SUCCESS';
export const STATE_GET_RULE_ERROR = 'STATE_GET_RULE_ERROR';

export const SET_PUSH_TOKEN = 'SET_PUSH_TOKEN';
export const SET_PUSH_TOKEN_FAIL = 'SET_PUSH_TOKEN_FAIL';
export const SEND_PUSH_TOKEN = 'SEND_PUSH_TOKEN';
export const UPDATE_PUSH_TOKEN = 'UPDATE_PUSH_TOKEN';
export const SET_DEVICE_ID = 'SET_DEVICE_ID';
export const SET_DEVICE_ID_FAIL = 'SET_DEVICE_ID_FAIL';



export const initalState = {
  
  user: {
    rehydated: false,
    oidc: null,
    isLoggingIn: false,
    error: null,
    refreshTime: null,
    isRefreshingToken: false
  },
  lookup: {
    currencies: [],
    countries: []
  },
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    subscriptions : [],
    selectedSubscription: null,
    isProfileLoadCalled: false,
    isGettingProfile: false
  },
  recipient: {
    isGetting: false,
    isAdding: false,
    error:null,
    recipients: []
  },
  beneficiary: {
    isGetting: false,
    isAdding: false,
    beneficiaries: []
  },
  transfer: {
    isTransferring: false,
    isTransferred: false,
    amount: 0,
    fromCurrency: 'SGD',
    walletDetailId:"9d7e2236-734f-4ce7-918b-b525f84d5afb",
    recipientId: "9d7e2236-734f-4ce7-918b-b525f84d5afb" 
  },
  convert:{
    isConverting: false,
    isConverted: false,
    error:null,
  },
  deposit:{
    isDepositting: false,
    isDepositted: false,
    error:null
  },
  wallet: {
    isFetching: true,
    walletDetails: [],
    transactions:[],
    total: 0
  },
  rule:{
    currencies:null
  },
  rate:{
    rates: []
  },
  device: {
    token: null,
    deviceId: null
  }
  
};