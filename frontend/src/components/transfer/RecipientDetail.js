import React from 'react';
import { Text, View, Badge, Right, H1, Icon } from 'native-base';
import PropTypes from 'prop-types';

const RecipientDetail = props => {
  return (
    <View style={{alignItems:'center', flexDirection:'row'}}>
      <View style={{marginRight:10, backgroundColor:'white', width: 50, height: 50, borderRadius:25, alignItems:'center', justifyContent:'center'}}>
        <Icon name="md-person" style={{color:"#6f86c0"}}/>
      </View>  
      <Text subtitle-black>{props.name}</Text>
      <Text subtitle-inactive>{props.subscriptionNo}</Text>
    </View>
  );
};

RecipientDetail.propTypes = {
  name: PropTypes.string
};

export default RecipientDetail;