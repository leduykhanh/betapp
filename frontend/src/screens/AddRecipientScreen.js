import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Button, View, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/recipientActions';
import { LoadingButton, ImageBackground, GradientButton, InputView } from '../components/common';

import styles from './styles';

class AddRecipient extends Component {
  
  state = {
    subscriptionNo: '',
    name: '',
    typing: false,
    submitted: false
  };
  
  confirm(){
    
    let recipientData = {
      subscriptionNo: this.state.subscriptionNo,
      name: this.state.name
    };
    this.setState({submitted: true});
    this.props.actions.createRecipient(this.props.subscription.subscriptionId, recipientData) ; 
  }
  
  
  render() {
    
    let validated = this.state.subscriptionNo !== '' && this.state.name !== '';
    
    return (
      <Container>
        <ImageBackground>
          <Content style={{ marginTop: 120 }}>
            <View>
              <InputView login error={this.state.submitted ? this.props.recipient.error: null} >
                <Item rounded login error={this.state.typing} style={{...styles.heavyBorder}}>
                  <Input
                      value={this.state.subscriptionNo}
                      onChangeText={(value) => this.setState({ subscriptionNo: value })}
                      placeholder="Subscription number"
                      />
                </Item>
              </InputView>
            </View>
            <View>    
              <Item rounded login error={this.state.typing} style={{...styles.heavyBorder}}>
                <Input
                    value={this.state.name}
                    onChangeText={(value) => this.setState({ name: value })}
                    placeholder="Name"
                    />
              </Item>
            </View>  
            <View heavyMargin style={{marginTop:50}}>
              <GradientButton onPress={this.confirm.bind(this)} rounded success disabled={!validated} text='Save' isLoading={this.props.recipient.isAdding && true} />
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
    recipient: state.recipient
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
)(AddRecipient);