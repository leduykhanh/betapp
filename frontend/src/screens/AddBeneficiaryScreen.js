import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Picker, Content, Radio, Item, Input, Text, Button, View, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {KeyboardAvoidingView} from 'react-native';
import * as actions from '../actions/beneficiaryActions';
import { ImageBackground, GradientButton, LoadingButton } from '../components/common';
import styles from './styles';

const TYPES = [
  {Label: 'Business', value: 'BUSINESS'},
  {Label: 'Individual', value: 'INDIVIDUAL'},
  {Label: 'Self', value: 'SELF'}
];

class AddBeneficiary extends Component {
  
  state = {
    type: 'BUSINESS',
    name: '',
    contactNo: '',
    email: '',
    bank: '',
    accountNo: '',
    iban: '',
    swiftCode: '',
    country: 'SG'
  };
  
  // state = {
  //   type: 'BUSINESS',
  //   name: '',
  //   contactNo: '1234',
  //   email: 'you@koku.io',
  //   bank: 'DBS',
  //   accountNo: '11111',
  //   iban: 'fad',
  //   swiftCode: 'daadad',
  //   country: 'SG'
  // };
  
  confirm(){
    
    let beneficiaryData = {
      type: this.state.type,
      name: this.state.name,
      contactNo: this.state.contactNo,
      email: this.state.email,
      bank: this.state.bank,
      accountNo: this.state.accountNo,
      iban: this.state.iban,
      swiftCode: this.state.swiftCode,
      country: this.state.country
    };
    
    this.props.actions.createBeneficiary(this.props.subscription.subscriptionId, beneficiaryData) ; 
  }
  
  
  render() {
    let countries = this.props.lookup.countries;
    let validated = this.state.name !== '' && this.state.email !== '' && this.state.bank !== '' && this.state.contactNo !== ''
    && (this.state.iban !== '' ||  this.state.accountNo != '');
    return (
      <Container>
        <ImageBackground>

          <Content style={{ marginBottom: 90, marginLeft:20, paddingRight:20, marginTop: 80 }}>
          <KeyboardAvoidingView
            behavior="padding">
              <Text subtitle-black>Select type of beneficiary</Text>
              <View style={{...styles.commonView, flexDirection:'row', justifyContent: 'space-between'}}>
                
                {
                  TYPES.map(t =>
                  <View key={t.value} onPress={()=> this.setState({type:t.value})} style={{ flexDirection:'row'}}>
                    <Radio selected={t.value === this.state.type}  onPress={()=> this.setState({type:t.value})}/>
                    <Label onPress={()=> this.setState({type:t.value})}> {t.Label} </Label>
                  </View>  
                )}
              </View>
              <View commonView>
                <Item floatingLabel>
                  <Label>Beneficiary's Name</Label>
                  <Input
                      value={this.state.name}
                      onChangeText={(value) => this.setState({ name: value })}
                      />
                </Item>
              </View>  

              <View commonView>
                <Item floatingLabel>
                  <Label>Beneficiary's Bank Name</Label>
                  <Input
                      value={this.state.bank}
                      onChangeText={(value) => this.setState({ bank: value })}
                      />
                </Item>
              </View>  

              <View commonView>
                <Item floatingLabel>
                  <Label>Beneficiary's Bank Account number</Label>
                  <Input
                      value={this.state.accountNo}
                      onChangeText={(value) => this.setState({accountNo: value })}
                      />
                </Item>
              </View>  

              <View commonView>
                <Item floatingLabel>
                  <Label>IBAN</Label>
                  <Input
                          value={this.state.iban}
                          onChangeText={(value) => this.setState({ iban: value })}
                      />
                </Item>
              </View>  

              <View commonView>
                <Item floatingLabel>
                  <Label>Swift Code</Label>
                  <Input
                          value={this.state.swiftCode}
                          onChangeText={(value) => this.setState({ swiftCode: value })}
                      />
                </Item>
              </View>  

              <View commonView>
                <View style={{borderWidth:1, borderRadius: 10}}>
                  <Picker
                      mode="dropdown"
                      placeholder="Country"
                      selectedValue={this.state.country}
                      onValueChange={(value) => this.setState({country:value})}>
                      {countries.map(detail=><Item key={detail.isoCode} label={detail.name} value={detail.isoCode}  />)}
                  </Picker>
                </View>  
              </View>  

              <View commonView>
                <Item floatingLabel>
                  <Label>Beneficiary's Contact Number</Label>
                  <Input
                      value={this.state.contactNo}
                      onChangeText={(value) => this.setState({ contactNo: value })}
                      />
                </Item>
              </View>  

              <View commonView>
                <Item floatingLabel>
                  <Label>Beneficiary's Email</Label>
                  <Input
                      value={this.state.email}
                      onChangeText={(value) => this.setState({ email: value })}
                      />
                </Item>
              </View>  
              <View heavyMargin style={{marginTop: 30}}>
                <GradientButton onPress={this.confirm.bind(this)} rounded success disabled={!validated} text='Save' isLoading={this.props.beneficiary.isAdding && true} />        
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
    subscription: state.profile.selectedSubscription,
    beneficiary: state.beneficiary,
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
)(AddBeneficiary);