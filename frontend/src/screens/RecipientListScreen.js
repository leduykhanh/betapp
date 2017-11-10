import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, ListItem, Item, Input, Label, Button, Right, Text, View, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {Image, Alert} from 'react-native';
import RecipientDetail from '../components/transfer/RecipientDetail';
import Footer from '../components/layout/Footer';
import { LoadingButton } from '../components/common';
import * as actions from '../actions/recipientActions';
import {ImageBackground, GradientButton, AddButton} from '../components/common';

import styles from './styles';

class RecipientList extends Component {
  
  componentWillMount() {
    this.props.actions.getRecipientList(this.props.subscription.subscriptionId);
  }
  
  deleteRecipient(recipientId){
    this.props.actions.deleteRecipient(this.props.subscription.subscriptionId, recipientId);
  }
  
  populateRecipientListView() {
    let recipients = this.props.recipient;
    
    if (recipients.length > 0) {
      return(
        <View>
          {recipients.map(
          (d, i) =>
          <View horizontal key={i} style={{padding:10,backgroundColor:i%2==0?'#e3e8f7':'#eff6ff', justifyContent: 'space-between'}}>
            <RecipientDetail key={i} subscriptionNo={d.subscriptionNo} name={d.name} />
            <Button bordered onPress={() => Alert.alert(
              'confirm delete?',
              d.name,
              [
                {text: 'OK', onPress: this.deleteRecipient.bind(this, d.recipientId)},
                {text: 'Cancel'}
              ]
            )}><Text>Delete</Text></Button>
  
          </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={{ alignItems:'center', paddingBottom: 100, paddingTop: 80 }}>
          <Image source={require('../../assets/images/recipients.png')} style={{marginBottom: 10}} />
          <Text>You have not added any recipients yet.</Text>
        </View>
      );
    }
  }
  
  render() {
    
    let recipients = this.props.recipient;
    
    if (!recipients) {
      return <Spinner />
    }
    
    return (
      
      <Container>
        <ImageBackground>
          <Content>    
            <View style={{ marginTop: 20, marginBottom: 14, paddingTop: 32, alignItems:'center' }}>
              <Text logo-text-style>Recipients</Text>
            </View>
            
            <View heavyMargin style={{ paddingTop: 50}}>
              <AddButton onPress={Actions.add_recipient} rounded success text='Add Recipient' isLoading={false}/>
            </View>  
                        
            {this.populateRecipientListView()}
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
    recipient: state.recipient.recipients,
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
)(RecipientList);