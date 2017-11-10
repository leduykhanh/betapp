import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Button, Title, Text, View, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import {Image} from 'react-native';
import Footer from '../components/layout/Footer';
import {InputView, Section, ImageBackground, GradientButton, AmountView} from '../components/common';

class Profile extends Component {
  
  render() {
    
    if (!this.props.profile.selectedSubscription) {
      return <Spinner />;
    }
    
    return (
      <Container>
        <ImageBackground>
        
          <Content style={{ marginTop: 70 }}>    
              <View style={{justifyContent:'center', flexDirection: 'row'}}>
                  <Image
                      style={{width: 100, height: 100, marginBottom: 60}}
                      source={require('../../assets/images/icon.png')}
                  />
              </View>
              <View commonView>
                  <Text subtitle-black>{`Name: ${this.props.profile.firstName} ${this.props.profile.lastName}`}</Text>
              </View>

              <View commonView>
                  <Text subtitle-black>{`Email: ${this.props.profile.email}`}</Text>
              </View>
              <View commonView>
                  <Text subtitle-black>{`Subscription Alias: ${this.props.profile.selectedSubscription.alias}`}</Text>
              </View>

              <View commonView>
                  <Text subtitle-black>{`Subscription Number: ${this.props.profile.selectedSubscription.subscriptionNo}`}</Text>
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
)(Profile);