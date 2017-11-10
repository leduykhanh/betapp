import React from 'react';
import {View, Icon} from 'native-base';
import {Dimensions} from 'react-native'

const Divider = () => {
  let length = Dimensions.get('window').width - 150;
  return (
    <View horizontal style={{borderTopWidth:1, paddingLeft: length, marginRight: 10, marginLeft: 10, top:23, borderColor: 'grey'}}>

    </View>  
  )
}

export default Divider;