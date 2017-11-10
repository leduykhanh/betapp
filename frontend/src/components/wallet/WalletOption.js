import React from 'react';
import { Text, View, Badge, Right } from 'native-base';
import PropTypes from 'prop-types';
import { TouchableHighlight, Dimensions } from 'react-native';


const WalletOption = props => {
    let bgColor = props.selected ? 'green': 'grey';
    return (
        <TouchableHighlight onPress={props.onPress} >
            <View
            style={{borderRadius:5, width:100, height: 100, backgroundColor: bgColor, margin: 5, justifyContent: 'center', alignItems: 'center'}}>
            
                <Text>{props.currency}</Text>
                <Text>{props.amount}</Text>
              
            </View>
        </TouchableHighlight>  
    );
    };

WalletOption.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
};

export default WalletOption;