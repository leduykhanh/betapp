import { Platform, PushNotificationIOS } from 'react-native';
import FCM from 'react-native-fcm';

export default function getToken(callback) {
  
  try {
    
    if (typeof Expo === 'undefined') {
      if (Platform.OS === "ios") {
        handleIOS(callback);
      } else if (Platform.OS === "android") {
        handleAndriod(callback);
      }
    }
    
  } catch(err) {
  }
  
}

export function requestToken() {
  try {
    
    if (typeof Expo === 'undefined') {
      if (Platform.OS === "ios") {
        PushNotificationIOS.requestPermissions();
      } else if (Platform.OS === "android") {
        FCM.requestPermissions();
      }
    }
    
  } catch(err) {
  }
}

function handleIOS(callback) {
  PushNotificationIOS.requestPermissions();
  PushNotificationIOS.addEventListener('register', callback);
}

function handleAndriod(callback) {
  FCM.requestPermissions();
  FCM.getFCMToken().then(callback);
}