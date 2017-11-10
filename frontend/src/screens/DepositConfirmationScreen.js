import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, H3, Content, Form, Item, Input, Label, Button, Title, Text, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/depositActions';
import { Section, StepIndicator } from '../components/common';
import BankDetail from '../components/bank/BankDetail';
import { LoadingButton } from '../components/common';

import styles from './styles';

class DepositConfirmation extends Component {
  
  state = {
    bankTransactionId: ''
  };
  
  confirm(){
    
    let depositData = {
        bankAccountId: this.props.data.selectedBank.bankAccountId,
        amount: this.props.data.amount,
        bankTransactionId: this.state.bankTransactionId,
        currency: this.props.data.currency
    };
    
    this.props.actions.deposit(this.props.subscription.subscriptionId, depositData);
  }
  
  render() {
    let validated = this.state.bankTransactionId !== '';
    return (
      <Container style={{margin: 30, padding: 10, flexDirection:'column', justifyContent: 'center'}}>
        
        <Content >
          <StepIndicator currentPosition={2} />
          <H3>Next Steps:</H3>
          
          {/* <Text>{`Confirm Deposit To :  ${this.props.data.currency}`}</Text>
          <Text>{`Amount : ${this.props.data.amount}`}</Text>
          
          <Text>{`To this Bank :`}</Text>
          <BankDetail data={this.props.data.selectedBank} /> */}
          
          <View style={{margin: 30, padding: 10, borderWidth:0.5, flexDirection:'column', justifyContent: 'center'}}>
            <Text>Transaction ID</Text>
            <Input
                placeholder='ABC-000111222'
                value={this.state.bankTransactionId}
                onChangeText={(value) => this.setState({ bankTransactionId: value })}
                />
          </View>         
          <LoadingButton onPress={this.confirm.bind(this)}  bordered disabled={!validated} text='Continue' isLoading={this.props.isDepositting}/>

        </Content>
        
      </Container>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    user: state.user,
    subscription: state.profile.selectedSubscription,
    isDepositting: state.deposit.isDepositting
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
)(DepositConfirmation);