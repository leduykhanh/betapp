import React from 'react';
import { Text, Button, Spinner, View } from 'native-base';
import PropTypes from 'prop-types';

const InputView = props => {

  return (
    <View {...props}>
      {props.children}
      {props.error != '' && <Text red>{props.error}</Text>}
    </View>
  );
};

InputView.propTypes = {

};

export default InputView;