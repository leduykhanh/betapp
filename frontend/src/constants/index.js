
import AppConfig from './config';
import ErrorMessages from './errors';
const BASE_URL = 'http://jangkoo.com/api';
export const LOGIN_API = `${BASE_URL}/auth/rest-auth/login/`;
export const LOGOUT_API = `${BASE_URL}/auth/rest-auth/logout/`;
export const BET_API = `${BASE_URL}/bet`;

export { AppConfig, ErrorMessages };
