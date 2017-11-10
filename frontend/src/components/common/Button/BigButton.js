import React from 'react';
import { Text, Button, Spinner } from 'native-base';
import { TouchableOpacity, Dimensions, Image, View } from 'react-native';
import KokuIcon from '../../layout/svg/KokuIcon';

import PropTypes from 'prop-types';
const IMAGES = {
  topup : require('./images/topup.png'),
  transfer : require('./images/transfer.png'),
  convert : require('./images/convert.png'),
  withdraw: require('./images/withdraw.png')
}
const BigButton = props => {
  let {height, width} = Dimensions.get('window');
  return (
    <TouchableOpacity  
        style={{width:width/2 - 40, margin: 10, height:width/4, justifyContent:'center',
                borderRadius: 5,
                alignItems:'center', backgroundColor:props.color,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 3
                }}
        onPress={props.onPress}>
      <View>
        <KokuIcon size={50} name={props.icon} color="#4740c7"/>
        <Text>{props.text}</Text>
      </View>  
    </TouchableOpacity>
  );
};

BigButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default BigButton;