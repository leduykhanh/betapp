import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, ListItem, Item, Input, Label, Button, Right, Text, View, Spinner, variables } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {Image, Alert} from 'react-native';
import BeneficiaryDetail from '../components/bank/BeneficiaryDetail';
import Footer from '../components/layout/Footer';
import {ImageBackground, GradientButton, LoadingButton,AddButton } from '../components/common';
import * as actions from '../actions/beneficiaryActions';

import styles from './styles';

class BeneficiaryList extends Component {
  
  componentWillMount() {
    this.props.actions.getBeneficiaryList(this.props.subscription.subscriptionId);
  }
  
  deleteBeneficiary(beneficiaryId){
    this.props.actions.deleteBeneficiary(this.props.subscription.subscriptionId, beneficiaryId);
  }
  
  populateBeneficaryList() {

    let beneficiaries = this.props.beneficiary;
    
    if (beneficiaries.length > 0) {
      return (
        <View>
          {beneficiaries.map(
            (d, i) =>
              <View key={i} horizontal 
              style={{padding:10,justifyContent: 'space-between', backgroundColor:i%2==0?'#e3e8f7':'#eff6ff'}}>
                <BeneficiaryDetail key={i} data={d} />
                <Button bordered blueBorder onPress={() => Alert.alert(
                    'Are you sure you want to delete?',
                    d.name,
                    [
                      {text: 'Delete', onPress: this.deleteBeneficiary.bind(this, d.beneficiaryId)},
                      {text: 'Cancel'}
                    ]
                  )}><Text>Delete</Text>
                </Button>
              </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={{ alignItems:'center', paddingBottom: 100, paddingTop: 80 }}>
          <Image source={require('../../assets/images/beneficiary.png')} style={{ marginBottom: 10 }} />
          <Text>You have not added any beneficiaries yet.</Text>
        </View>
      );
    }
  }
  
  render() {
    
    let beneficiaries = this.props.beneficiary;
    
    if (!beneficiaries) {
      return <Spinner />
    }
    
    
    return (
      
      <Container>
        <ImageBackground>
          <Content>
            
            <View style={{ marginTop: 20, marginBottom: 14, paddingTop: 32, alignItems:'center' }}>
              <Text logo-text-style>Beneficiaries</Text>
            </View>
            <View heavyMargin>
              <AddButton onPress={Actions.add_beneficiary} rounded success text='Add Beneficiary' isLoading={false}/>
            </View>  
            {this.populateBeneficaryList()}  
            
          </Content>
          <Footer />
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
    actions : bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeneficiaryList);