import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, View, Item, Input, Label, Button, Title, Text, Picker,Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import styles from './styles';
import CountdownTimer from '../components/common/countdown/CountdownTimer';
import {KEYBOARD_IDLE_TIME} from '../constants';
import * as ConvertApi  from '../api/ConvertApi';
import {LoadingButton, CurrencyPopup, ImageBackground, AmountView, SwapIcon, Divider, GradientButton, GradientLoader } from '../components/common';
import currencyHelper from '../utils/currencyHelper';
import toLocaleString from '../utils/numberHelper';

class Convert extends Component {
  
  state = {
    fromCurrency: null,
    toCurrency: null,
    rate: 0,
    fromAmount: 0,
    displayFromAmount:'',
    toAmount: 0,
    displayToAmount:'',
    amountType: 'FROM',
    isFetchingRate: false,
    totalSecondsLeft: 60,
    lockRateId: '',
    timeOut:null,
    fees:0
  };
  
  constructor(props) {
    super(props);
    
    this.state.fromCurrency = props.wallet.walletDetails.length > 0 ? props.wallet.walletDetails[0].currency: null;
    // this.state.toCurrency = props.lookup.currencies.length >1 ? this.props.lookup.currencies[1].code: null;
    this.state.toCurrency = props.wallet.walletDetails.length > 1 ? props.wallet.walletDetails[1].currency: null;
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

  getRate(){
    if(this.state.fromCurrency === this.state.toCurrency || this.state.fromAmount + this.state.toAmount === 0) {
      let amount = this.state.amountType === 'FROM'? this.state.fromAmount: this.state.toAmount;
      this.setState({rate:1,fromAmount:amount,toAmount:amount,displayFromAmount:amount, displayToAmount:amount});
      return;
    }
    
    this.setState({isFetchingRate : true});

    ConvertApi.lockRate(this.props.profile.selectedSubscription.subscriptionId, this.state)
      .then((response) => {
        
        const { rate, totalSecondLeft, fromAmount, toAmount, lockRateId, remainingBalance, fees} = response.data.data;
        
        this.setState({
          isFetchingRate : false,
          rate,
          totalSecondLeft,
          fromAmount,
          displayFromAmount: fromAmount,
          displayToAmount: toAmount,
          toAmount,
          lockRateId,
          remainingBalance,
          fees
        });
      }
    ).catch((error, status, info) => {
    });
  }

  swap(){
    let fromCurrency = this.state.fromCurrency;
    let toCurrency = this.state.toCurrency;
    
 
    
    let validated = (this.state.fromCurrency !== this.state.toCurrency) && (this.state.fromAmount + this.state.toAmount) > 0;
    
    if (validated){
      this.state.toCurrency = fromCurrency;
      this.state.fromCurrency = toCurrency;
      this.setState({
        fromCurrency:toCurrency,
        toCurrency: fromCurrency,
        amountType: 'FROM'
      });
      this.getRate();
    }
      
  }

  submit(){
    Actions.convert_confirm({data:this.state});
  }

  cancel(){
    Actions.pop();
  }

  
  updateDisplayFromAmount() {
    if(this.state.timeOut) clearTimeout(this.state.timeOut);
    const displayFromAmount = (this.state.fromAmount);
    
    this.setState({
      displayFromAmount: displayFromAmount,
      timeOut: this.state.fromAmount>0?setTimeout(this.getRate.bind(this), KEYBOARD_IDLE_TIME):null
    });

  }

  updateDisplayToAmount() {
    if(this.state.timeOut) clearTimeout(this.state.timeOut);
    const displayToAmount = (this.state.toAmount);
    
    this.setState({
      displayToAmount: displayToAmount,
      timeOut: this.state.toAmount>0?setTimeout(this.getRate.bind(this), KEYBOARD_IDLE_TIME):null
    });
    
  }

  onChangeFromAmount(value) {
    
    if(this.state.timeOut) clearTimeout(this.state.timeOut);
    let frommAmount = currencyHelper(value);
    this.setState({
      displayFromAmount: value,
      fromAmount: frommAmount,
      amountType: 'FROM',
      timeOut: frommAmount>0?setTimeout(this.getRate.bind(this), KEYBOARD_IDLE_TIME):null
    })
  }
  
  onChangeToAmount(value) {

    if(this.state.timeOut) clearTimeout(this.state.timeOut);
    let toAmount = currencyHelper(value);
    this.setState({
      displayToAmount: value,
      toAmount: toAmount,
      amountType: 'TO',
      timeOut: toAmount>0 ? setTimeout(this.getRate.bind(this), KEYBOARD_IDLE_TIME): null
    })
  }
  
  timerEndCallBack(){
    this.getRate();
  }
  
  render() {
    const {walletDetails} = this.props.wallet;  
    let availableBalance = 0;
    let currentToBalance = 0;
    
    walletDetails && walletDetails.map(
        detail => {
            if (detail.currency === this.state.fromCurrency)
                availableBalance = detail.availableBalance;
            if (detail.currency === this.state.toCurrency)
              currentToBalance = detail.availableBalance;    
        }  
    );
    let remainingBalanace = this.state.remainingBalance ? this.state.remainingBalance: availableBalance;
    let validated = (this.state.fromCurrency !== this.state.toCurrency) && (this.state.fromAmount + this.state.toAmount) > 0 && remainingBalanace>0;
    let loadingComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve(
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Resolved</Text>
          </View>
        );
      }, 6000);
    });
    return (
      <Container>
        <ImageBackground>
          <Content style={{ marginTop: 70 }}>
            <KeyboardAvoidingView
                behavior="padding">
              <View commonView >
                {/* <GradientLoader  /> */}
                <View style={{ padding: 10, flexDirection:'row'}}>
                {availableBalance >= this.state.fromAmount ?
                  <Text subtitle-inactive>
                    {`Available wallet balance:  ${this.state.fromCurrency}  ${remainingBalanace > 0? toLocaleString(remainingBalanace): 0} `}
                  </Text>:
                  <Text subtitle-inactive red>You do not have enough balance</Text>}
                </View>
                
                <AmountView
                  amount={this.state.displayFromAmount}
                  onChangeAmount={this.onChangeFromAmount.bind(this)}
                  list={this.props.wallet.walletDetails}
                  aKey={'currency'}
                  aValue={'currency'}
                  onValueChange={this.onFromCurrencyChange.bind(this)}
                  selectedValue={this.state.fromCurrency}
                  onBlur={this.updateDisplayFromAmount.bind(this)}
                  loading={this.state.isFetchingRate}
                />
                
                {this.state.rate !==0?
                <View horizontal style={{borderLeftWidth:3, borderColor:'grey', marginTop:20,justifyContent:'space-between', marginLeft: 42, paddingLeft: 20}}>
                  <Text subtitle-inactive-small>{`- ${this.state.fees} ${this.state.fromCurrency}`}</Text>
                  <Text subtitle-inactive-small>Koku fees</Text>
                </View>  : <Text></Text>
                      }
                <View horizontal  style={{ left: 20}}>
                  <SwapIcon onPress={this.swap.bind(this)}/>
                  <Divider />
                </View>
                
                {this.state.rate !==0?
                    <View>
                      <View horizontal style={{borderLeftWidth:3, borderColor:'grey', justifyContent:'space-between', marginLeft: 42, paddingLeft: 20}}>
                        <Text subtitle-inactive-small>{`${toLocaleString(this.state.fromAmount)} ${this.state.fromCurrency}`}</Text>
                        <Text subtitle-inactive-small>{`Amount Converted`}</Text>
                        {/* <View style={{...styles.commonView, flexDirection:'row'}}>
                          <Text>This rate will be reset in </Text>
                            <CountdownTimer total={100} remaining={this.state.totalSecondsLeft} timerEndCallBack={this.timerEndCallBack.bind(this)} />
                          <Text>seconds</Text>
                        </View> */}
                      </View>
                      <View horizontal style={{borderLeftWidth:3, borderColor:'grey', justifyContent:'space-between', marginLeft: 42, paddingLeft: 20}}>
                        <Text subtitle-inactive-small>{`@ ${this.state.rate.toFixed(5)}`}</Text>
                        <Text subtitle-inactive-small>{`Exchange Rate`}</Text>
                      </View>
                    </View>
                    : <Text></Text>
                      }
                <View style={{ padding: 10, flexDirection:'row'}}>
                    <Text subtitle-inactive>{`Current wallet balance:  ${this.state.toCurrency}  ${currentToBalance > 0? toLocaleString(currentToBalance): 0} `}</Text>
                </View>
                
                <AmountView
                  amount={this.state.displayToAmount}
                  onChangeAmount={this.onChangeToAmount.bind(this)}
                  list={this.props.wallet.walletDetails}
                  aKey={'currency'}
                  aValue={'currency'}
                  onValueChange={this.onToCurrencyChange.bind(this)}
                  selectedValue={this.state.toCurrency}
                  onBlur={this.updateDisplayToAmount.bind(this)}
                  loading={this.state.isFetchingRate}
                  />
                 {this.state.fromCurrency == this.state.toCurrency?
                  <Text red>Please select to convert to a difference currency before proceeding.</Text>
                 :<Text></Text>}      
              </View>
                <View heavyMargin style={{marginTop:30}}>
                  <GradientButton isLoading={false} disabled={!validated || this.state.rate == 0 || this.state.isFetchingRate} bordered onPress={this.submit.bind(this)} text='Continue' />
                  {/* <Button danger rounded onPress={this.cancel.bind(this)}><Text>Cancel</Text></Button> */}
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
    lookup: state.lookup,
    profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions : bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Convert);