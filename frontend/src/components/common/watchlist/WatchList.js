import React from 'react';
import { Text, Button, Spinner } from 'native-base';
import { TouchableHighlight, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const WatchList = props => {
  let {height, width} = Dimensions.get('window');
  return (
    <TouchableHighlight  
        style={{width:width -20, height:width/3, justifyContent:'center', alignItems:'center', margin:10, backgroundColor:'purple'}}
        onPress={() => alert('Coming!')}>
      <Text>Currency WatchList</Text>
    </TouchableHighlight>
  );
};

WatchList.propTypes = {
  
};

export default WatchList;