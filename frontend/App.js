import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import {getLookupData} from './src/actions/lookupActions';

import Routes from './src/routes';
import getTheme from './koku-themes/components';
import { StyleProvider, Spinner } from 'native-base';

import {refreshToken} from './src/api/UserApi';
import * as constants from './src/constants';
import serverCall from './src/utils/serverCall';
import {getOidc, setOidc} from './src/utils/persistStore';
import {requestToken} from './src/utils/deviceTokenHelper';

export default class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isRefreshingToken: true,
      store: null
    };
  }
  
  async componentWillMount() {

    if (typeof Expo !== 'undefined') {
      await Expo.Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        koku: require("./assets/fonts/koku.ttf"),
      });
    }
    
    this.setState({ isReady: true});
    this.state.store = await configureStore();
    
    getLookupData()(this.state.store.dispatch);
    
    const sessionOidc = JSON.parse(await getOidc());

    if (sessionOidc && sessionOidc.refresh_token) {
      // Call Server
  
      this.state.store.dispatch({
        type: constants.STATE_REFRESH_PENDING
      });
      
      refreshToken(sessionOidc.refresh_token).then((response) => {
        
        serverCall.defaults.headers['Authorization'] = 'Bearer ' + response.data.access_token;
        
        setOidc(response.data);
        
        this.state.store.dispatch({
          type: constants.STATE_REFRESH_SUCCESS,
          payload: response.data
        });
        
        this.setState({
          isRefreshingToken: false
        });

      }).catch((err) => {
        this.clearState();
      });
      
    } else {
      this.clearState();
    }
    
  }
  
  clearState() {
    this.setState({
      isRefreshingToken: false
    });
  
    AsyncStorage.clear();
  }


  componentDidMount() {
    requestToken();
  }

  render() {
    
    if (this.state.isRefreshingToken) {
      return <Spinner />;
    }
    
    return (
      <StyleProvider style={getTheme()}>
        <Provider store={this.state.store}>
          <Routes />
        </Provider>
      </StyleProvider>  
    );
  }
}