import React from 'react';
import {Image} from 'react-native';
import { Text, View, Badge, Right, H1 } from 'native-base';
import PropTypes from 'prop-types';

const BeneficiaryDetail = props => {
  return (
    <View onPress={props.onPress} style={{flexDirection:'row'}}>
      
      <Image source={require('../../../assets/images/benefiaciary_list_icon.png')} />
      
      <View style={{ marginLeft: 10 }}>
        
        {/* <View style={{ marginBottom: 10 }}>
          
          
          <Text subtitle-inactive>{props.data.contactNo}</Text>
        </View> */}
        
        <View>
          <Text subtitle-black>{props.data.name}</Text>
          <Text subtitle-inactive>{props.data.bank}</Text>
          <Text subtitle-inactive>{props.data.accountNo}</Text>
          <Text subtitle-inactive>{props.data.email}</Text>
          <Text subtitle-inactive>{props.data.country}</Text>
        </View>
        

      </View>
    </View>
  );
};

BeneficiaryDetail.propTypes = {
    bankName: PropTypes.string
};

export default BeneficiaryDetail;