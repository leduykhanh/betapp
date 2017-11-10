import React from 'react';
import {View, Icon} from 'native-base';
import { Image } from 'react-native';

const SuccessIcon = () => {
  return (
    <Image style={{width:66, height:66, margin:14}} source={require('./images/successTick.png')}/>
  )
}

export default SuccessIcon;