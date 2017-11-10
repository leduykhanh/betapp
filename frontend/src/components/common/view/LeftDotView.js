import React from 'react';
import { Text, View, Badge, Right, H3 } from 'native-base';
import PropTypes from 'prop-types';

const LeftDotView = props => {
  return (
    <View>
      <View horizontal >
        <View style={{width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: 'red',
            left: 5  }}> 
        </View>
        <View style={{paddingLeft:20}}>  
          <H3 >{props.headerText}</H3>
        </View>  
      </View>
        <View  style={{borderLeftWidth:1, marginLeft:15}}>
          {props.children}
        </View>  
    </View>
  );
};

LeftDotView.propTypes = {
    headerText: PropTypes.string
};

export default LeftDotView;