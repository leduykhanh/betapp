import React, { Component } from 'react';
import { Container, Header, Footer, FooterTab, Button,  Text,View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import Icon from './svg/KokuIcon';

export default class FooterTabs extends Component {
  
  render() {
    
    let currentScene =  Actions.currentScene.toString();
    
    return (
        <Footer>
          <FooterTab>    
            
            <Button vertical onPress={() => {Actions.dashboard()}} active={currentScene === '_dashboard'}>
              <Icon active name="home" size={22} color={currentScene === '_dashboard'? "#4740c7" : "grey"}/>
              <Text>Home</Text>
            </Button>

            <Button vertical onPress={() => Actions.wallet()} active={currentScene === '_wallet'} >
              <Icon name="wallet" size={22} color={currentScene === '_wallet'? "#4740c7" : "grey"}/>
              <Text>Wallet</Text>
            </Button>
            
            <Button vertical active={currentScene === '_transaction_history'} onPress={() => Actions.transaction_history()}>
              <Icon active name="history" size={22} color={currentScene === '_transaction_history'? "#4740c7" : "grey"}/>
              <Text>History</Text>
            </Button>

            <Button onPress={() => Actions.drawerOpen()} vertical active={false} >
              <Icon name="more" size={22}/>
              <Text>More</Text>
            </Button>

          </FooterTab>
        </Footer>

    );
  }
}