import React from 'react';
import { Text, Icon, View } from 'native-base';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const AddButton = props => {

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View horizontal style={{alignItems:'center'}}>
        <Icon style={{fontSize: 35, color: '#4740c7', marginRight:10}} name="md-add-circle"  />
        <Text subtitle-active> {props.text} </Text>
      </View>  
    </TouchableOpacity>
  )
};

AddButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default AddButton;