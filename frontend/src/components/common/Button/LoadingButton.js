import React from 'react';
import { Text, Button, Spinner } from 'native-base';
import PropTypes from 'prop-types';

const LoadingButton = props => {
  if (props.isLoading) {
    return (
      <Spinner />
    );
  }
  
  return (
    <Button {...props}>
      <Text>{props.text}</Text>
    </Button>
  );
};

LoadingButton.propTypes = {
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default LoadingButton;