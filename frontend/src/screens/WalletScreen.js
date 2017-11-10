import Pie from 'react-native-pie'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, View, Content, Form, Item, Input, Label, Button, Segment, Text } from 'native-base';
import {RefreshControl} from 'react-native'
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import currencyHelper from '../utils/currencyHelper';
import Footer from '../components/layout/Footer';
import Wallet from '../components/wallet/Wallet';
import * as actions from '../actions/walletActions';
import {ImageBackground} from '../components/common';
import styles from './styles';


class WalletScreen extends Component {
  
  state = {
      amount:0,
      isRefreshing: false,
      lastUpdate: new Date()
  };
  _onRefresh(){
    this.props.actions.getWallet(this.props.subscriptionId);
    this.setState({lastUpdate: new Date()});
  }

  componentWillMount() {
    this.props.actions.getWallet(this.props.subscriptionId);
  }

  render() {
      
      return (
      <Container>
         <ImageBackground>  
            <Content
            refreshControl={<RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor="#ff0000"
                title="Loading..."
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
            />}>

                <View style={{ marginTop: 20, marginBottom: 14, paddingTop: 32, alignItems:'center' }}>
                  <Text logo-text-style>Wallet</Text>
                </View>
              
                <Wallet details={this.props.wallet.walletDetails}/>
              
                <View center>
                  <Text subtitle-inactive>Pull to refresh</Text>
                  <Text subtitle-inactive>{`Last updated at ${moment(this.state.lastUpdate).format('HH.mm')}`}</Text>
                </View>
              
            </Content>
            <Footer />
         </ImageBackground>  
    </Container>
      );
  }
  
}

function mapStateToProps(state) {
  return {
    user: state.user,
    wallet: state.wallet,
    subscriptionId: state.profile.selectedSubscription ? state.profile.selectedSubscription.subscriptionId : ''
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletScreen);