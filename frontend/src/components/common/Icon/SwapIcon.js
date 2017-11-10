import React from 'react';
import {View, Icon} from 'native-base';
import { TouchableOpacity } from 'react-native';

const SwapIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View horizontal style={{backgroundColor: '#4740c7',
         width:46, height: 46, borderRadius: 23,
         justifyContent: 'center', alignItems: 'center',
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.2,
         shadowRadius: 2,
         elevation: 3}}>
        <Icon white big name='ios-arrow-round-up' />
        <Icon white big name='ios-arrow-round-down' />
      </View>  
    </TouchableOpacity>
  )
}

export default SwapIcon;