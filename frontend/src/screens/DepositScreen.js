import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, List, View, Content, Picker, Item, Input, Label, Button, Title, Text, Spinner , ListItem} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {Clipboard, KeyboardAvoidingView, ToastAndroid} from 'react-native';

import currencyHelper from '../utils/currencyHelper';
import * as BankApi from '../api/BankApi';
import BankDetail from '../components/bank/BankDetail';
import * as actions from '../actions/depositActions';
import { Section, StepIndicator,ImageBackground, GradientButton, AmountView } from '../components/common';
import toLocaleString from '../utils/numberHelper';


import styles from './styles';


class Deposit extends Component {
    
  state = {
      amount:1000,
      currency: 'SGD',
      bankList: [],
      fetchingBank: false,
      selectedBank: null,
      bankTransactionId: ''
  };

  onChangeAmount(value){
      this.setState({
          amount: currencyHelper(value)
        })
  }
  getBankList(currency){
    BankApi.getBankList(this.props.subscription.subscriptionId, currency).then(response => {
        this.setState({
            fetchingBank: false,
            bankList: response.data.kokuBankAccounts,
            selectedBank: response.data.kokuBankAccounts?response.data.kokuBankAccounts[0]:null
        });
      }).catch(error => {
        
          });
  }

  componentWillMount(){
      this.getBankList(this.state.currency);
  }
  
  onCurrencyChange(value){
    
    this.setState({
        currency: value,
        fetchingBank: true
    });
    this.getBankList(value);

  }
  
  onBankSelect(data){
    this.setState({
        selectedBank: data
    });
  }

  onBankChange(value){
      this.state.bankList.map(b => {
       if (b.bankAccountId === value)
        this.setState({
            selectedBank: b
        });
      })
  }

  copyBank(){
    Clipboard.setString('Bank name ' + this.state.selectedBank.bankName + '\n Bank Account ' + this.state.selectedBank.accountNo );
    
  }

  submit(){
      // Actions.deposit_confirmation({data: this.state});
      let depositData = {
        bankAccountId: this.state.selectedBank.bankAccountId,
        amount: this.state.amount,
        bankTransactionId: this.state.bankTransactionId,
        currency: this.state.currency
    };
    
    this.props.actions.deposit(this.props.subscription.subscriptionId, depositData);
  }

  cancel(){
      Actions.pop();
  }

  render() {
    let validated = this.state.amount > 0 && this.state.bankTransactionId !== '' && this.state.selectedBank != null;
    
      return (
      <Container>
        
        <ImageBackground>
          
          <Content style={{ paddingBottom: 10, marginTop: 70 }}>
            <KeyboardAvoidingView
              behavior="padding">

              <Section headerText='Input Top up Amount' number={1}>
                <View commonView> 
                  <AmountView 
                    amount={this.state.amount}
                    onChangeAmount={this.onChangeAmount.bind(this)}
                    list={this.props.wallet.walletDetails}
                    aKey={'currency'}
                    aValue={'currency'}
                    onValueChange={this.onCurrencyChange.bind(this)}
                    selectedValue={this.state.currency}
                />
                </View>
              </Section>
              
              <Section headerText='Make a transfer to N4P PTE LTD' number={2}>
                <View commonView style={{marginBottom:14}}>
                  <Text subtitle-black>To top up your KokuPay Wallet, make a transfer using the below reference.</Text>
                </View>
                <View commonView>  
                  {this.state.selectedBank && <BankDetail data= {{...this.state.selectedBank, amount:toLocaleString(this.state.amount)}} />}
                </View>
              </Section>
              
              <Section headerText='Verify top up' number={3}>
                <View commonView>
                  <Text>After making the transaction, paste your transaction ID below to verify your top up. The transaction ID can be found in your invoice.</Text>
                </View>  
                <View heavyMargin  style={{marginTop:20, borderRadius:10, padding: 4,backgroundColor:'white'}} with-shadow>
                    <Input
                      placeholder='ABC-000111222'
                      value={this.state.bankTransactionId}
                      onChangeText={(value) => this.setState({ bankTransactionId: value.trim() })}
                    />
                  </View>  
              </Section>

              <View heavyMargin>
                  <GradientButton disabled={!validated} bordered onPress={this.submit.bind(this)} text='Confirm' isLoading={this.props.isDepositting}/>
              </View>
              <View style={{ height: 60 }} />
            </KeyboardAvoidingView>
          </Content>
          
        </ImageBackground>
        
      </Container>
      );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    lookup: state.lookup,
    subscription: state.profile.selectedSubscription,
    isDepositting: state.deposit.isDepositting,
    wallet: state.wallet
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
)(Deposit);