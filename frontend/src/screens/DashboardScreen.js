import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, View, Content, Form, Item, Input, Spinner, Label, Button, Title, Text, H2 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';

import { ScrollView, TouchableHighlight, Image } from 'react-native';


import * as actions from '../actions/profileActions';
import { BigButton, ImageBackground } from '../components/common';
import Footer from '../components/layout/Footer';
import ProfileSummary from '../components/profile/ProfileSummary';
import {getTransactionHistory} from '../actions/walletActions';
import * as deviceActions from '../actions/deviceActions';

import {Section} from '../components/common';
import TransactionDetailCard from '../components/wallet/TransactionDetailCard';
import RateCard from '../components/rate/RateCard';
import { NUMBER_ACTIVITIES_ON_DASHBOARD } from '../constants';
import styles from './styles';

import deviceTokenHelper from '../utils/deviceTokenHelper';

import {getDeviceId} from '../utils/persistStore';


class Dashboard extends Component {
  
  async componentDidMount() {
    const {sendToken, updateToken} = this.props.deviceActions;
    //const {token, deviceId} = this.props.device;
    const { isProfileLoadCalled, selectedSubscription } = this.props.profile;
    const deviceId = await getDeviceId();
    
    deviceTokenHelper(token => {
      deviceId ? updateToken(token, deviceId) : sendToken(token);
    });
    


    if (isProfileLoadCalled === false) {
      this.props.actions.getFullProfile();
    }
    
    if (selectedSubscription) {
      this.props.getTransactionHistory(this.props.profile.selectedSubscription.subscriptionId, 0);
    }
    
  }
  
  static componentWillUpdate(nextProps) {
    

    
    if (nextProps.user.rehydated && (!nextProps.user.oidc || !nextProps.user.oidc.access_token)) {
      Actions.popTo('login');
    }
    
  }
  
  getRecentActivities() {
   if (this.props.wallet.transactions && this.props.wallet.transactions.length > 0) {
     return (
       <View>
  
         <Text subtitle-black style={styles.paddingLeft}>Recent Activities</Text>
         
         <ScrollView horizontal>
           <View style={{...styles.commonView, flexDirection:'row', alignItems: 'center'}} >
             
             {this.props.wallet.transactions.map((data, i) => i < NUMBER_ACTIVITIES_ON_DASHBOARD &&
              <TransactionDetailCard key={i} data={data} />)
             }
             
             {this.props.wallet.total > NUMBER_ACTIVITIES_ON_DASHBOARD &&
               <TouchableHighlight onPress={Actions.transaction_history}style={styles.cardView}>
                 <Text>View more</Text>
               </TouchableHighlight>
             }
             
           </View>
         </ScrollView>
         
       </View>
     );
   } else {
     return (
       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
         
         <View style={{
           height: 120,
           width: 340,
           marginBottom: 22,
           backgroundColor: '#D6D6D6',
           borderRadius: 10,
           justifyContent: 'center',
           alignItems: 'center',
           shadowColor: '#000',
           shadowOffset: { width: 0, height: 2 },
           shadowOpacity: 0.5,
           shadowRadius: 2}}>
           <Image
             source={require('../../assets/images/receipt_gray.png')} style={{ marginBottom: 10 }}/>
           <Text subtitle-black>No recent transactions to show</Text>
         </View>
       </View>
     );
   }
  }
  
  getExchangeRates() {
    return (
      <View style={{ }}>
        
        <Text subtitle-black style={styles.paddingLeft}>Exchange Rate</Text>
        
        <ScrollView horizontal>
          <View style={{...styles.commonView, flexDirection:'row'}} >
            {this.props.rate.rates.map((data, i) => data.rate && <RateCard key={i} data={data} />)}
          </View>
        </ScrollView>
        
      </View>
    );
  }
  
  render() {

    if (this.props.profile.isGettingProfile === true && this.props.profile.isProfileLoadCalled === true) {
      return <Spinner />;
    }
    
    return (
      <Container>
        
        <ImageBackground>
          
          <Content>
            
            <ProfileSummary onPress={Actions.profile} data={this.props.profile} />
  
            { this.getRecentActivities() }

            { this.getExchangeRates() }
  
            <View style={{justifyContent:'center', flexDirection:'row'}}>
              <BigButton onPress={Actions.deposit} text="Top Up" icon='top-up' color='white'/>
              <BigButton onPress={Actions.transfer} text="Transfer" icon='transfer' color='white'/>
            </View>
  
            <View style={{justifyContent:'center', flexDirection:'row'}}>
              <BigButton onPress={Actions.convert} text="Convert" icon='convert' color='white'/>
              <BigButton onPress={Actions.withdraw} text="Withdraw" icon='withdraw' color='white'/>
            </View>

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
    profile: state.profile,
    wallet: state.wallet,
    rate: state.rate,
    device: state.device
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(actions, dispatch),
    getTransactionHistory: (subId, startingIndex) => dispatch(getTransactionHistory(subId, startingIndex) ),
    deviceActions : bindActionCreators(deviceActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);