import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { View, Button, Text, ListItem, Icon, Left, Right } from 'native-base';
import { Image } from 'react-native';
import {TouchableOpacity, Modal, ScrollView} from 'react-native';
import {Lightbox} from 'react-native-router-flux';


const IMAGES = {
  SGD: require('./flags/SG.png'),
  USD: require('./flags/US.png'),
  THB: require('./flags/TH.png'),
  HKD: require('./flags/HK.png'),
  TWD: require('./flags/TW.png'),
  AUD: require('./flags/AU.png'),
  CAD: require('./flags/CA.png'),
  JPY: require('./flags/JP.png'),
  TWD: require('./flags/TW.png'),
  PHP: require('./flags/PH.png'),
  NZD: require('./flags/NZ.png'),
  IDR: require('./flags/ID.png'),
  CNY: require('./flags/CN.png'),
  MYR: require('./flags/MY.png'),
  EUR: require('./flags/EU.png'),
  CHF: require('./flags/CH.png'),
  GBP: require('./flags/GB.png')
}

class CurrencyModal extends Component {

  state = {
    visible: false,
    search:{}
  };

  constructor(props){
    super(props);
    props.currencies.map(c => this.state.search[c.code] = c.name);
  }

  show(){
    this.setState({
      visible: true
    });
  }

  hide(){
    this.setState({
      visible: false
    });
  }

  render(){
    
    return (
    <View >
      <TouchableOpacity onPress={this.show.bind(this)}>
        <View
          style={{flexDirection: 'row', padding:10, alignItems:'center'}}
        >
          <Image source={IMAGES[this.props.selectedCurrency]} style={{width: 32, height: 32, borderRadius: 0, marginRight:5}}/>
          <Text >{this.props.selectedCurrency}</Text>
          <Icon name="ios-arrow-down" style={{fontSize:15, marginLeft: 10}}/>
        </View>
      </TouchableOpacity>  
      <Modal visible={this.state.visible}
            onRequestClose={this.hide.bind(this)} 
            presentationStyle='fullScreen'
      >
        <View style={{justifyContent:'center', marginTop:80, marginBottom:80, marginRight:20}}>
          <View horizontal center style={{padding:10, borderBottomWidth:0}}>
            <Left >
              <Icon onPress={this.hide.bind(this)} name="md-arrow-back" />
            </Left>  
            <Text body-inactive-text-style>Select Currency</Text>
            <Right>
              <Icon onPress={this.hide.bind(this)} name="ios-close-circle-outline" />
            </Right>  
              
          </View>
          <ScrollView>  
            {
              this.props.list.map((c, i) => 
              <ListItem key={i} style={{flexDirection: 'row', backgroundColor:this.props.selectedCurrency==c[this.props.aKey]?'rgba(71, 64, 199, 0.2)':'white'}}
                  onPress={() => {this.props.onValueChange(c[this.props.aKey]);this.hide()} }>
                <Image source={IMAGES[c[this.props.aKey]]} style={{width: 32, height: 32, borderRadius: 0,marginRight:10, marginLeft:10}}/>
                <Text body-text-style >{c[this.props.aKey]}  {this.state.search[c[this.props.aKey]]}</Text>
              </ListItem>  
              )
            }
          </ScrollView>
        </View>
      </Modal>
    </View>
    )
  }

}
function mapStateToProps(state) {
  return {
    currencies: state.lookup.currencies
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
)(CurrencyModal);