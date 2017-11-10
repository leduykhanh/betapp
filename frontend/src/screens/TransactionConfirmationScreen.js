import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Button, H3, Text,View } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {MessageBarManager} from 'react-native-message-bar';
import * as actions from '../actions/transferActions';
import {LoadingButton, GradientButton, ImageBackground, Divider} from '../components/common';
import styles from './styles';
import toLocaleString from '../utils/numberHelper';

class TransactionConfimation extends Component {
  
  confirm() {
    if (this.props.data.fromCurrency === this.props.data.toCurrency)
      this.props.actions.transfer(this.props.profile.selectedSubscription.subscriptionId, this.props.transfer);
    else 
    this.props.actions.transferCrossWallet(this.props.profile.selectedSubscription.subscriptionId, this.props.data);
  }
  
  render() {
    
    let recipientName = '';
    let beforeBalance = 0;
    let afterBalance = 0;
    let amount = this.props.transfer.amount;
    
    this.props.recipient && this.props.recipient.map(r => {
      if (r.recipientId == this.props.transfer.recipientId)
        recipientName = r.name;
    });
    
    this.props.wallet && this.props.wallet.walletDetails.map(w => {
      if(w.walletDetailId === this.props.transfer.walletDetailId){
        beforeBalance = w.availableBalance;
        afterBalance = beforeBalance - amount;
      }
    });
    
    return (
      <Container>
        <ImageBackground>
          <Content style={{ marginTop: 90 }}>
            <View center heavyMargin commonView>
              <Text body-active-text-style>Transaction summary</Text>
            </View>
            {/* <Divider /> */}
            <View  withBorder heavyMargin style={{borderWidth:1, borderRadius: 9, backgroundColor: 'white'}}>
              <View commonView> 
                <Text subtitle-inactive>{`You are sending:`}</Text>
                <Text body-text-style red>{`${toLocaleString(this.props.data.fromAmount)}  ${this.props.data.fromCurrency}`}</Text>
              </View>  
              <View commonView> 
                <Text subtitle-inactive>{`${recipientName} receives: `}</Text>
                <Text body-text-style green >{`${toLocaleString(this.props.data.toAmount)}  ${this.props.data.toCurrency}`}</Text>
              </View> 
              {this.props.data.fromCurrency !== this.props.data.toCurrency?    
                <View commonView> 
                  <Text subtitle-inactive>{`Conversion rate: `}</Text>
                  <Text>{`1 ${this.props.data.fromCurrency} =  ${this.props.data.rate} ${this.props.data.toCurrency}`}</Text>
                </View>  
              :<Text></Text>}          
              <View commonView> 
                <Text subtitle-inactive>{`Koku Fees: `}</Text>
                <Text green>{`${this.props.data.fees}  ${this.props.data.fromCurrency}`}</Text>
              </View> 
            </View>  
            <View heavyMargin>
              <GradientButton onPress={this.confirm.bind(this)} rounded success isLoading={false} text='Confirm' />
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
    transfer: state.transfer,
    recipient: state.recipient.recipients,
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
)(TransactionConfimation);