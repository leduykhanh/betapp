import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Button, Title, Text ,View} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/withdrawActions';
import * as transferActions from '../actions/transferActions';

import { LoadingButton, GradientButton, ImageBackground } from '../components/common';
import BeneficiaryDetail from '../components/bank/BeneficiaryDetail';
import styles from './styles';
import toLocaleString from '../utils/numberHelper';

class WithdrawConfirmation extends Component {
  
  
  confirm(){
    
    if (this.props.data.fromCurrency === this.props.data.toCurrency)
      this.props.actions.withdraw(this.props.subscription.subscriptionId, this.props.data);
    else
      this.props.transferActions.transferCrossBank(this.props.subscription.subscriptionId, this.props.data);
  }
  
  render() {
    let beneficiaryName = '';
    this.props.beneficiary && this.props.beneficiary.map(r => {
      if (r.beneficiaryId == this.props.data.beneficiaryId)
        beneficiaryName = r.name;
    });
    return (
      <Container>
        
        <ImageBackground>
          <Content style={{ marginTop: 90 }}>
            <View center heavyMargin commonView>
              <Text body-active-text-style>Transaction summary</Text>
            </View>
            <View  withBorder heavyMargin style={{borderWidth:1, borderRadius: 9, backgroundColor: 'white'}}>
              <View commonView> 
                <Text subtitle-inactive>{`You are sending:`}</Text>
                <Text body-text-style red>{`${toLocaleString(this.props.data.fromAmount)}  ${this.props.data.fromCurrency}`}</Text>
              </View>  
              <View commonView> 
                <Text subtitle-inactive>{`${beneficiaryName} receives: `}</Text>
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
              
              {/* <Text>{`To this Bank :`}</Text>
              <BeneficiaryDetail data={this.props.data.selectedBeneficiary} /> */}
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
    subscription: state.profile.selectedSubscription,
    beneficiary: state.beneficiary.beneficiaries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(actions, dispatch),
    transferActions: bindActionCreators(transferActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawConfirmation);