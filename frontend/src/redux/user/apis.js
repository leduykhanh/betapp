import axios from 'axios';
import * as constants from '../../constants';

const config = {
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Basic a29rdS5tb2JpbGUuY2xpZW50OllYQndhV1E2TVRNM05qazNOekV0WmpVMU1pMDBZemxoTFdJNE1qZ3RNekkyTldNM056Wm1NV1JqRFFvPQ==',
    'Content-Type': 'application/json'
  }
};

export function login(email:string, password:string) {
  
  const data = {
    email: email,
    password: password,

  };
  
  return axios.post(constants.LOGIN_API, data, config);
  
}

export function logout(){
  return axios.post(constants.LOGOUT_API,{}, config);
}