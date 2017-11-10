import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, View, Content, Form, Item, Input, Label, Button, Title, Text,  Picker, Icon} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {ScrollView,Dimensions,KeyboardAvoidingView} from 'react-native';
import WalletOption from '../components/wallet/WalletOption';
import * as actions from '../actions/beneficiaryActions';
import BeneficiaryDetail from '../components/bank/BeneficiaryDetail';
import currencyHelper from '../utils/currencyHelper';
import * as ConvertApi  from '../api/ConvertApi';
import {KEYBOARD_IDLE_TIME} from '../constants';
import {InputView, Section, ImageBackground, GradientButton, AmountView} from '../components/common';

import styles from './styles';

class Withdraw extends Component {
  
  state = {
    fromCurrency: null,
    fromAmount: 0,
    displayFromAmount: '',
    beneficiaryId: '',
    selectedBeneficiary: null,
    amountError: '',
    toAmount: 0,
    displayToAmount: '',
    amountType: 'FROM',
    timeOut: null,
    fees: 0,
    typing: true
  };
    
  constructor(props) {
    super(props);
    
    const {walletDetails} = props.wallet;
    
    this.state.fromCurrency = walletDetails && walletDetails.length > 0 ? walletDetails[0].currency: null;
    this.state.amount = this.state.displayAmount = this.state.currency?this.props.rule[this.state.currency].WITHDRAWAL_LOWER_LIMIT : 0;
    this.state.toCurrency = walletDetails && walletDetails.length > 0 ? walletDetails[0].currency: null;
    this.state.selectedBeneficiary = this.props.beneficiary ? this.props.beneficiary[0]: null;
    this.state.beneficiaryId = this.state.selectedBeneficiary?this.state.selectedBeneficiary.beneficiaryId:'';
  }
    
  componentWillMount() {
    this.props.actions.getBeneficiaryList(this.props.subscription.subscriptionId);
  }
    
  submit(){
    Actions.withdraw_confirmation({data: this.state});
    }
  
  onToCurrencyChange(value: string) {
      this.setState({
        toCurrency: value
      });
      this.state.toCurrency = value;
      this.getRate();
    }

  updateWithdrawAmount(value: string) {
      let frommAmount = currencyHelper(value);
      let amountError = this.getError(frommAmount, this.state.fromCurrency);
        
      if(this.state.timeOut) clearTimeout(this.state.timeOut);

      this.setState({
        displayFromAmount: value,
        fromAmount: frommAmount,
        amountType: 'FROM',
        amountError: amountError,
        typing: true,
        timeOut: frommAmount>0?setTimeout(this.getRate.bind(this), KEYBOARD_IDLE_TIME):null
      })
    }
  
  getError(amount, currency)  {
    let minAmount = this.props.rule[currency].WITHDRAWAL_LOWER_LIMIT;
    
    const {walletDetails} = this.props.wallet;  
    let availableBalance = 0;
    walletDetails && walletDetails.map(
        detail => {
            if (detail.currency === currency)
                availableBalance = detail.availableBalance;
        }  
    );
    
    let maxAmount = Math.min(availableBalance, this.props.rule[currency].WITHDRAWAL_UPPER_LIMIT);
    
    let amountError = '';
    
    if(amount < minAmount) 
      amountError = 'Minimum amount is ' + currency +' '+ minAmount 
    if(amount > maxAmount) 
      amountError = 'Maximum amount is ' + currency +' '+ maxAmount 
    
    return amountError;  
  }
   
  getRate(){
    if(this.state.fromCurrency === this.state.toCurrency || this.state.fromAmount + this.state.toAmount === 0) {
      let amount = this.state.amountType === 'FROM'? this.state.fromAmount: this.state.toAmount;
      this.setState({
        rate:1,
        fromAmount:amount,
        toAmount:amount,
        displayFromAmount:amount, 
        displayToAmount:amount,
        typing: false});
      return;
    }
    
    this.setState({isFetchingRate : true});

    ConvertApi.lockRate(this.props.subscription.subscriptionId, this.state)
      .then((response) => {
        
        const { rate, totalSecondLeft, fromAmount, toAmount, lockRateId, remainingBalance, fees} = response.data.data;
        let amountError = this.getError( fromAmount, this.state.fromCurrency);
        
        this.setState({
          isFetchingRate : false,
          typing: false,
          displayFromAmount: fromAmount,
          displayToAmount: toAmount,
          rate,
          totalSecondLeft,
          fromAmount,
          amountError,
          toAmount,
          lockRateId,
          remainingBalance,
          fees
        });
      }
    ).catch((error, status, info) => {
      this.setState({amountError:error.response.data.message});
    });
  }
  

  updateDisplayAmount() {
      
      const amount = this.state.fromAmount.toLocaleString();
      
      this.setState({
        displayFromAmount: amount
      });
    }
    
    
  cancel(){
        Actions.pop();
    }
    
  onCurrencyChange(value: string) {

    let amountError = this.getError(this.state.fromAmount, value);
    this.setState({
      amountError,
      fromCurrency: value
      });
    this.state.fromCurrency = value;
    this.getRate();  
    }
    
  onBeneficiaryChange(value: string) {
    let selectedBeneficiary = null;
    // console.log(value);
    
    this.props.beneficiary && this.props.beneficiary.map(
      b => {
        if (b.beneficiaryId === value) selectedBeneficiary = Object.assign({}, b);
      }
    );
    
    this.setState({
      beneficiaryId: value,
      selectedBeneficiary: selectedBeneficiary
    });
  }

  updateToAmount(value: string) {
    //(value) => this.setState({ amount: currencyHelper(value) })
    if(this.state.timeOut) clearTimeout(this.state.timeOut);
    let toAmount = currencyHelper(value);
    this.setState({
      displayToAmount: value,
      toAmount: toAmount,
      amountType: 'TO',
      typing: true,
      timeOut: toAmount>0?setTimeout(this.getRate.bind(this), KEYBOARD_IDLE_TIME):null
    });
    
  }
  
  updateDisplayToAmount() {
    
    const amount = this.state.toAmount.toLocaleString();
    
    this.setState({
      displayToAmount: amount
    });
  }

    
  render() {
    
    const {walletDetails} = this.props.wallet;  
    let availableBalance = 0;
    let minAmount = this.props.rule[this.state.fromCurrency].WITHDRAWAL_LOWER_LIMIT;
    walletDetails && walletDetails.map(
        detail => {
            if (detail.currency === this.state.fromCurrency)
                availableBalance = detail.availableBalance;
        }  
    );
    let validated = this.state.fromAmount >= minAmount && this.state.beneficiaryId !='' && this.state.fromAmount <= availableBalance;

    return (
      <Container>
        <ImageBackground>
          <Content style={{ marginBottom: 90, marginTop: 70 }}>
            <KeyboardAvoidingView
                  behavior="padding">
              <View commonView>
              <Text subtitle-black>Withdraw to Bank Account</Text>
                <View horizontal style={{borderColor: '#4740c7',borderWidth:1, borderRadius: 10, alignItems: 'center', paddingLeft: 15}}>
                    <Icon name="person" />
                    <Picker
                        style={{width:Dimensions.get('window').width - 70}}
                        mode="dropdown"
                        placeholder="Withdraw to  a beneficiary"
                        selectedValue={this.state.beneficiaryId}
                        onValueChange={this.onBeneficiaryChange.bind(this)}>
                        {this.props.beneficiary && this.props.beneficiary.map(detail=>
                        <Item key={detail.beneficiaryId} label={`${detail.name}(${detail.accountNo})`} value={detail.beneficiaryId}  />)}
                    </Picker>
                  </View>
                  <Text underline subtitle-inactive onPress={Actions.add_beneficiary} style={{ marginTop: 10}}>Add a new beneficiary</Text>
              </View>  

              <View commonView>
                <Text subtitle-black>You send</Text>
                <InputView error={this.state.amountError}>
                  <AmountView 
                    amount={this.state.displayFromAmount}
                    onChangeAmount={this.updateWithdrawAmount.bind(this)}
                    list={this.props.wallet.walletDetails}
                    aKey={'currency'}
                    aValue={'currency'}
                    onBlur={this.updateDisplayAmount.bind(this)}
                    onValueChange={this.onCurrencyChange.bind(this)}
                    selectedValue={this.state.fromCurrency}
                    loading={this.state.isFetchingRate}
                  />
                </InputView>  
              </View>
              
              <View commonView>
                  <Text subtitle-black>Beneficiary receives</Text>
                  <AmountView 
                    amount={this.state.displayToAmount}
                    onChangeAmount={this.updateToAmount.bind(this)}
                    list={this.props.lookup.currencies.filter(a => a.isBankCurrency)}
                    aKey={'code'}
                    aValue={'code'}
                    onBlur={this.updateDisplayToAmount.bind(this)}
                    onValueChange={this.onToCurrencyChange.bind(this)}
                    selectedValue={this.state.toCurrency}
                    loading={this.state.isFetchingRate}
                  />
                </View>  
              <View heavyMargin style={{marginTop:30}}>             
                <GradientButton text='Continue' disabled={!validated || this.state.isFetchingRate || this.state.typing} onPress={this.submit.bind(this)} isLoading={false} />
              </View>
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
    wallet: state.wallet,
    beneficiary: state.beneficiary.beneficiaries,
    subscription: state.profile.selectedSubscription,
    rule: state.rule.currencies,
    lookup: state.lookup
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
)(Withdraw);