import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PopupDialog from 'react-native-popup-dialog';
import { View, Button, Text, ListItem } from 'native-base';
import { Image } from 'react-native';
import { TouchableHighlight } from 'react-native';
import {Lightbox} from 'react-native-router-flux';


const IMAGES = {
  SGD: require('./flags/SG.png'),
  USD: require('./flags/US.png')
}
class CurrencyPopup extends Component {
  constructor(props){
    super(props);
  }

  render(){
    
    return (
    <View >
      <View
        onPress={() => {
          this.popupDialog.show();
        }}
        style={{flexDirection: 'row'}}
      >
        <Image source={IMAGES[this.props.selectedCurrency]} style={{width: 32, height: 32, borderRadius: 16}}/>
        <Text onPress={() => {
          this.popupDialog.show();
        }}>{this.props.selectedCurrency}</Text>
      </View>
      <PopupDialog containerStyle={{zIndex:9999}}
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
      >
        <View style={{zIndex:9999}}>
          {
            this.props.currencies.map((c, i) => 
            <ListItem key={i} style={{flexDirection: 'row'}}
                onPress={() => {this.props.onValueChange(c.code);this.popupDialog.dismiss()} }>
              <Image source={IMAGES[c.code]} style={{width: 32, height: 32, borderRadius: 16}}/>
              <Text >{c.name} {c.code} </Text>
            </ListItem>  
            )
          }
        </View>
      </PopupDialog>
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
)(CurrencyPopup);