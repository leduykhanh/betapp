import React, { Component } from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Button,
  View,
  StyleProvider,
  getTheme,
  variables,
  Thumbnail 
} from "native-base";
import {Image} from 'react-native';
import * as actions from '../../actions/userActions';
import { Actions } from 'react-native-router-flux';
import KokuIcon from '../layout/svg/KokuIcon';


class DrawerContent extends Component {
  
  state = {
    shadowOffsetWidth: 1,
    shadowRadius: 4,
  };
  
  datas = [
    {
      name: "Manage Beneficiaries",
      icon: "bank",
      bg: "#eff6ff",
      image: require('./images/bank.png'),
      action: () => {
        Actions.replace('beneficiary_list');
      }
    },
    {
      name: "Manage Recipients",
      icon: "person",
      bg: "#e3e8f7",
      image: require('./images/person.png'),
      action: () => {
        Actions.replace('recipient_list');
      }
    },
    {
      name: "Top Up your wallet",
      icon: "top-up",
      bg: "#eff6ff",
      image: require('./images/topup.png'),
      action: () => {
        Actions.deposit();
      }
    }, 
    {
      name: "Convert your money",
      icon: "convert",
      bg: "#e3e8f7",
      image: require('./images/convert.png'),
      action: () => {
        Actions.convert();
      }
    },
    {
      name: "Transfer to Recipient",
      icon: "transfer",
      bg: "#eff6ff",
      image: require('./images/transfer.png'),
      action: () => {
        Actions.transfer();
      }
    },
    {
      name: "Withdraw to Beneficiary",
      icon: "withdraw",
      bg: "#e3e8f7",
      image: require('./images/withdraw.png'),
      action: () => {
        Actions.withdraw();
      }
    },
    {
      name: "Logout",
      route: "Logout",
      icon: "logout",
      bg: "#eff6ff",
      image: require('./images/logout.png'),
      action: () => {
        this.props.actions.logout();
      }
      
    }
];
  
  renderRow(data) {
    return (
      <ListItem button itemDivider onPress={data.action && data.action.bind(this)} 
        style={{backgroundColor:data.bg, height:60, borderTopColor: '#aaa', borderTopWidth: 1}}>
        <Left>
          {/* <Image
            style={{width: 36, height: 36, marginRight: 10, marginLeft: 10}}
            source={data.image}/> */}
          <KokuIcon name={data.icon}   size={36} color="#4740c7"/>
          <Text subtitle-active>
            {data.name}
          </Text>
        </Left>

      </ListItem>
    );
  }
  
  render() {

    return (
      <Container>

        <Content bounces={false} style={{ flex: 1, top: -1, paddingTop: 50 }}>

          <View commonView horizontal styke={{alignItems: 'center'}}>
            <View style={{justifyContent:'center', flexDirection: 'row'}}>
              {/* <Image
                style={{width: 50, height: 50, marginRight: 30}}
                source={require('./images/person.png')}
              /> */}
              <KokuIcon name="person"   size={60} color="#4740c7"/>
            </View>
            <View>
              <Text subtitle-active>{this.props.state.profile.firstName + ' ' + this.props.state.profile.lastName}</Text>
              <Text onPress={()=>Actions.replace('profile')} subtitle-inactive>View Profile</Text>
            </View>
          </View>

          <View>
            <List
                dataArray={this.datas}
                renderRow={data => this.renderRow(data)} />
          </View>

        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
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
)(DrawerContent);
