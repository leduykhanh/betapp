import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Button, H3, Text,View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import { MessageBarManager } from 'react-native-message-bar';
import * as actions from '../actions/depositActions';
import { LoadingButton } from '../components/common';
import { Section, StepIndicator, SuccessIcon, GradientButton, ImageBackground } from '../components/common';
import toLocaleString from '../utils/numberHelper';

import styles from './styles';

class DepositSuccess extends Component {
  
  newDeposit() {
    this.props.actions.Deposit(this.props.profile.selectedSubscription.subscriptionId, this.props.deposit);
  }
  
  render() {
    let todayDate = moment().format('HH:mm a, DD MMMM YYYY ');
    return (
      <Container>
        <ImageBackground>
        <Content>
          {/* <StepIndicator currentPosition={3} /> */}
          <View center heavyMargin commonView style={{marginTop:100}}>
            <Text body-text-style>Completed</Text>
            <SuccessIcon />
            <Text subtitle-inactive style={{marginLeft:80, marginRight:60}}>You will be notified upon a successful top up review.</Text>

          </View>   

          <View  withBorder heavyMargin style={{borderWidth:1, borderRadius: 9, backgroundColor: 'white'}}>
            <View commonView center style={{borderBottomWidth:1}}>
              <Text subtitle-inactive>{todayDate}</Text>
            </View> 
            <View commonView> 
              <Text subtitle-inactive>Transfer Amount</Text>
              <Text subtitle-black>{`${toLocaleString(this.props.data.amount)} ${this.props.data.currency}`}</Text>
            </View>  
            <View commonView>
              <Text subtitle-inactive>Transaction ID</Text>
              <Text subtitle-black>{this.props.data.bankTransactionId}</Text>
            </View>  
            <View center commonView>
              <Text underline onPress ={() => Actions.replace('wallet')}>View wallet</Text>
            </View>  
          </View>   
          
          <View heavyMargin>
            <GradientButton rounded text='OK' onPress ={() => Actions.replace('dashboard')}isLoading={false}/>
          </View>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    wallet: state.wallet
    // deposit: state.deposit
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
)(DepositSuccess);