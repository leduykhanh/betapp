import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, View, Item, Input, Label, Button, Title, Text, Picker, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {ScrollView, Dimensions, KeyboardAvoidingView} from 'react-native';
import WalletOption from '../components/wallet/WalletOption';
import RecipientListModal from '../components/transfer/RecipientListModal';
import RecipientDetail from '../components/transfer/RecipientDetail';
import * as transferActions from '../actions/transferActions';
import currencyHelper from '../utils/currencyHelper';
import * as ConvertApi  from '../api/ConvertApi';
import {KEYBOARD_IDLE_TIME} from '../constants';
import {Section, ImageBackground, GradientButton, AmountView, InputView} from '../components/common';
import styles from './styles';


class Transfer extends Component {
  
  state = {
    fromCurrency: null,
    toCurrency: null,
    showRecipientList: false,
    recipientId: '',
    rate: 2,
    fromAmount: 0,
    displayFromAmount: '',
    toAmount: 0,
    displayToAmount: '',
    amountType: 'FROM',
    timeOut: null,
    fees:0,
    amountError: '',
    typing: true
  };
  
  constructor(props) {
    super(props);
    
    this.state.fromCurrency = props.wallet.walletDetails.length > 0 ? props.wallet.walletDetails[0].currency : null;
    this.state.recipientId = this.props.recipient && this.props.recipient.length > 0 ? this.props.recipient[0].recipientId : '' ;
    this.state.toCurrency = props.wallet.walletDetails.length > 0 ? props.wallet.walletDetails[0].currency : null;
  }
  
  onFromCurrencyChange(value: string) {
    this.setState({
      fromCurrency: value
    });
    this.state.fromCurrency = value;
    this.getRate();
  }

  onToCurrencyChange(value: string) {
    this.setState({
      toCurrency: value
    });
    this.state.toCurrency = value;
    this.getRate();
  }

  openRecipientList(){
      this.setState({
          showRecipientList: true
      });
  }

  onRecipientSelect(id){
    this.setState({
      recipientId: id
    });
  }
  
  closeRecipientList(){
      this.setState({
          showRecipientList: false
      });
  }
  getRate(){
    if(this.state.fromCurrency === this.state.toCurrency || this.state.fromAmount + this.state.toAmount === 0) {
      let amount = this.state.amountType === 'FROM'? this.state.fromAmount: this.state.toAmount;
      this.setState(
        {rate:1,
        fromAmount:amount,
        toAmount:amount,
        displayFromAmount:amount, 
        displayToAmount:amount,
        typing: false});
      return;
    }
    
    this.setState({isFetchingRate : true});

    ConvertApi.lockRate(this.props.profile.selectedSubscription.subscriptionId, this.state)
      .then((response) => {
        
        const { rate, totalSecondLeft, fromAmount, toAmount, lockRateId, remainingBalance, fees} = response.data.data;
        let amountError = this.getError( fromAmount, this.state.fromCurrency);
        this.setState({
          isFetchingRate : false,
          rate,
          totalSecondLeft,
          fromAmount,
          amountError,
          toAmount,
          lockRateId,
          remainingBalance,
          fees,
          displayFromAmount: fromAmount,
          displayToAmount: toAmount,
          typing: false
        });
      }
    ).catch((error, status, info) => {
    });
  }
  
  submit(){
    let walletDetailId = "";
    
    this.props.wallet.walletDetails.map(detail => {
      if (detail.currency === this.state.fromCurrency)
        walletDetailId = detail.walletDetailId;
    });
    
    let data = {
        amount : this.state.fromAmount,
        fromCurrency : this.state.fromCurrency,
        walletDetailId : walletDetailId,
        //recipientId : this.props.recipient[this.state.recipientId].recipientId
        recipientId: this.state.recipientId
    };
  
    this.props.transferActions.newTransfer(data);
    Actions.transfer_confirm({data:this.state});
  }
  
  cancel(){ 
      Actions.pop();
  }
  
  addRecipient(){
    // this.closeRecipientList();
    Actions.add_recipient();
  }

  getError(amount, currency)  {
    let minAmount = 1;
    
    const {walletDetails} = this.props.wallet;  
    let availableBalance = 0;
    walletDetails && walletDetails.map(
        detail => {
            if (detail.currency === currency)
                availableBalance = detail.availableBalance;
        }  
    );
    
    let maxAmount = availableBalance;
    
    let amountError = '';
    
    if(amount < minAmount) 
      amountError = 'Minimum amount is ' + currency +' '+ minAmount.toLocaleString() 
    if(amount > maxAmount) 
      amountError = 'Maximum amount is ' + currency +' '+ maxAmount.toLocaleString() 
    
    return amountError;  
  }

  updateTransferAmount(value: string) {
    if(this.state.timeOut) clearTimeout(this.state.timeOut);
    
    let fromAmount = currencyHelper(value);
    let amountError = this.getError(fromAmount, this.state.fromCurrency);
    this.setState({
      displayFromAmount: value,
      amountError,
      fromAmount,
      amountType: 'FROM',
      typing: true,
      timeOut: fromAmount>0?setTimeout(this.getRate.bind(this), KEYBOARD_IDLE_TIME):null
    })
    
  }
  
  updateDisplayFromAmount() {
    
    const amount = this.state.fromAmount.toLocaleString();
    
    this.setState({
      displayFromAmount: amount
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
  
  populateTransferScreen() {
    
    let recipients = this.props.recipient;
    const {walletDetails} = this.props.wallet;  
    let availableBalance = 0;
    let minAmount = 1;
    walletDetails && walletDetails.map(
        detail => {
            if (detail.currency === this.state.fromCurrency)
                availableBalance = detail.availableBalance;
        }  
    );
    let validated = this.state.fromAmount >= minAmount && this.state.recipientId !='' && this.state.fromAmount <= availableBalance;
    
    if (!recipients || recipients.length === 0){
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text>Please add at a Recipient before proceeding to transfer</Text>
          <GradientButton text="Add Recipient" isLoading={false} style={{ width: 270, marginTop: 20 }} onPress={() => {
            Actions.add_recipient();
          }} />
        </View>
      )
    } else {
      return (
        <View>
          <View commonView>
            <Text subtitle-black>Transfer to KokuPay Wallet</Text>
            <View horizontal style={{borderColor: '#4740c7',borderWidth:1, marginTop:10, borderRadius: 10, alignItems: 'center', paddingLeft: 15}}>
              <Icon name="person" />
              <Picker
                style={{width:Dimensions.get('window').width - 70}}
                mode="dropdown"
                placeholder="Transfer to recipient"
                selectedValue={this.state.recipientId}
                onValueChange={(value) => this.setState({recipientId:value})}>
                {recipients.map(detail=><Item key={detail.recipientId} label={`${detail.name}`} value={detail.recipientId}  />)}
              </Picker>
            </View>
            <Text underline subtitle-inactive onPress={this.addRecipient} style={{ marginTop: 10}}>Add a new recipient</Text>
          </View>
  
          <View commonView>
            <Text subtitle-black>You send</Text>
            <InputView error={this.state.amountError}>
              <AmountView
                amount={this.state.displayFromAmount}
                onChangeAmount={this.updateTransferAmount.bind(this)}
                list={this.props.wallet.walletDetails}
                aKey={'currency'}
                aValue={'currency'}
                onBlur={this.updateDisplayFromAmount.bind(this)}
                onValueChange={this.onFromCurrencyChange.bind(this)}
                selectedValue={this.state.fromCurrency}
                loading={this.state.isFetchingRate}
              />
            </InputView>  
          </View>
  
          <View commonView>
            <Text subtitle-black>Recipient receives</Text>
            <AmountView
              amount={this.state.displayToAmount}
              onChangeAmount={this.updateToAmount.bind(this)}
              list={this.props.wallet.walletDetails}
              onBlur={this.updateDisplayToAmount.bind(this)}
              aKey={'currency'}
              aValue={'currency'}
              onValueChange={this.onToCurrencyChange.bind(this)}
              selectedValue={this.state.toCurrency}
              loading={this.state.isFetchingRate}
            />
          </View>
  
          <View heavyMargin style={{marginTop:30}}>
            <GradientButton text='Continue' disabled={!validated || this.state.isFetchingRate || this.state.typing} onPress={this.submit.bind(this)} isLoading={false} />
          </View>
        </View>
      );
    }
    
  }
  
  render() {
    
    return (
      <Container>
        <ImageBackground>
          
          <Content style={{ marginBottom: 90, marginTop: 70 }}>
            <KeyboardAvoidingView
                behavior="padding">
              {this.populateTransferScreen()}
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
    recipient: state.recipient.recipients,
    lookup: state.lookup,
    profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions : bindActionCreators(actions, dispatch)
    transferActions: bindActionCreators(transferActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transfer);