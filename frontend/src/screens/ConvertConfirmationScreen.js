import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, View, Item, Input, Label, Button, Title, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import { LoadingButton, GradientButton, ImageBackground } from '../components/common';

import * as actions from '../actions/convertActions';
import toLocaleString from '../utils/numberHelper';

class ConvertConfirmation extends Component {
  state={submitted:false};

  confirm(){
    this.props.actions.convert(this.props.subscription.subscriptionId, this.props.data.lockRateId);
    this.setState({submitted:true});
  }
  
  render() {
    return (
      <Container>
        <ImageBackground>
          <Content style={{ marginTop: 90 }}>
            <View center heavyMargin commonView>
              <Text body-active-text-style>Transaction summary</Text>
            </View>
            <View  withBorder heavyMargin style={{borderWidth:1, borderRadius: 9, backgroundColor: 'white'}}>
              <View commonView> 
                <Text subtitle-inactive>{`You are converting:`}</Text>
                <Text body-text-style red>{`${toLocaleString(this.props.data.fromAmount)}  ${this.props.data.fromCurrency}`}</Text>
                <Text>{`@ 1 ${this.props.data.fromCurrency} =  ${this.props.data.rate} ${this.props.data.toCurrency}`}</Text>
              </View>  
              <View commonView> 
                <Text subtitle-inactive>{`Koku Fees: `}</Text>
                <Text green>{`${this.props.data.fees}  ${this.props.data.fromCurrency}`}</Text>
              </View> 
              <View commonView> 
                <Text subtitle-inactive>{`You will get: `}</Text>
                <Text body-text-style green >{`${toLocaleString(this.props.data.toAmount)}  ${this.props.data.toCurrency}`}</Text>
              </View>  

            </View>  
            
            <View heavyMargin>
              {this.props.error && this.state.submitted?
              <View >
                <Text red>{this.props.error}</Text>
                <GradientButton onPress={Actions.pop} rounded success isLoading={this.props.isConverting} text='Go back' />
              </View>:
              <GradientButton onPress={this.confirm.bind(this)} rounded success isLoading={this.props.isConverting} text='Confirm' />
              }
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
    isConverting: state.convert.isConverting,
    error: state.convert.error
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
)(ConvertConfirmation);