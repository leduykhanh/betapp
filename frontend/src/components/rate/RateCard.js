import React from 'react';
import { Text, View, Badge, H2, Card, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

const RateCard = props => {
  
  let data = props.data;
  
  return (
    <View style={{borderRadius: 3,
      width:130,
      height: 90,
      backgroundColor: 'white',
      margin: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      justifyContent: 'center',
      alignItems: 'center'}}>
      
      <View horizontal style={{width:130, height: 30, justifyContent: 'center', alignItems: 'center'}}>
      	<Text subtitle-black>{ `${data.fromCurrency} ` }</Text>
        <Icon name="ios-arrow-round-forward" style={{top: 2}} />
        <Text subtitle-black>{ ` ${data.toCurrency}` }</Text>
      </View>
      
      <View style={{ borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
        backgroundColor: '#243fad',
        width:130,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'}}>
	      <Text white big >{`${data.rate} `}</Text>
	    </View>

    </View>
  );
};

RateCard.propTypes = {
};

export default RateCard;