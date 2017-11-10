import {AsyncStorage} from 'react-native';

export async function setOidc(oidc) {
  await AsyncStorage.setItem('koku:oidc', JSON.stringify(oidc));
}

export async function setDeviceId(deviceId: string) {
  await AsyncStorage.setItem('koku:deviceId', deviceId);
}

export async function getOidc() {
  return await AsyncStorage.getItem('koku:oidc');
}

export async function getDeviceId() {
  return await AsyncStorage.getItem('koku:deviceId');
}