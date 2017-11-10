import React from 'react';
import { Text, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = props => {
  if (props.isLoading) {
    return (
      <Spinner style={{ height: 46}} />
    );
  }
  
  if (props.disabled === true) {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{ padding:10,
        borderRadius: 35,
        backgroundColor: '#7e7e7e',
        alignItems:'center',
        justifyContent: 'center'}} {...props}>
        <Text style={{ fontSize: 24, color: 'white', textAlign: 'center'}}>
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      <LinearGradient colors={['#7c75e5', '#645ED8', '#4740c7']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{ height: 46, borderRadius: 35,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 24, color: 'white', textAlign: 'center'}}>
          {props.text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

GradientButton.propTypes = {
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool
};

export default GradientButton;