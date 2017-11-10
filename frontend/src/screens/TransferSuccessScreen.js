import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Button, H3, Text,View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import { MessageBarManager } from 'react-native-message-bar';
import * as actions from '../actions/transferActions';
import {LoadingButton,  Section, StepIndicator, SuccessIcon, GradientButton, ImageBackground} from '../components/common';

import styles from './styles';

class TransferSuccess extends Component {
  
  newTransfer() {
    this.props.actions.transfer(this.props.profile.selectedSubscription.subscriptionId, this.props.transfer);
  }
  
  render() {
    
    let todayDate = moment().format('HH:mm a, DD MMMM YYYY ');
    return (
      <Container>
        <ImageBackground>
          <Content>
            <View center heavyMargin commonView style={{marginTop:100}}>
              <Text body-text-style>Completed</Text>
              <SuccessIcon />
            </View>    
            <View  withBorder style={{borderWidth:1, borderRadius: 14, backgroundColor: 'white', marginLeft:48, marginRight: 48}}>
              <View commonView center style={{borderBottomWidth:1}}>
                <Text subtitle-inactive>{todayDate}</Text>
              </View> 
              <View commonView horizontal> 
                <Text subtitle-black>Your request to do a transfer is now being processed. Your transfer will be sent upon successful compliance review.</Text>
              </View>
              <View commonView horizontal style={{marginTop:10}}> 
                <Text subtitle-black >{`Your transaction ID is `}</Text>  
                <Text subtitle-black red>{this.props.data.number}</Text>
              </View>  

              <View center commonView>
                <Text underline onPress ={() => Actions.replace('wallet')}>View wallet</Text>
              </View>  
            </View> 
          <View heavyMargin style={{marginTop:40}}>
            <GradientButton rounded text='OK' onPress ={() => Actions.replace('dashboard')} isLoading={false}/>
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
    wallet: state.wallet,
    transfer: state.transfer
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
)(TransferSuccess);