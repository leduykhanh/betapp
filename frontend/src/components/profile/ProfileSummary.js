import React from 'react';
import { Text, View, Badge, Right, H1, H3 } from 'native-base';
import PropTypes from 'prop-types';
import {Image, TouchableOpacity} from 'react-native';

const ProfileSummary = props => {
  let data = props.data;
  return (
    <TouchableOpacity onPress={props.onPress} style={{ marginTop: 20 }}>
      
      <View style={{flexDirection:'row', justifyContent: 'space-between', padding:20 }}>
        <View style={{justifyContent:'center', flexDirection: 'row'}}>
          <Image
              onPress={props.onPress} 
              style={{width: 75, height: 75, borderRadius: 38}}
              source={require('../../../assets/images/icon.png')}
          />
          <View style={{marginLeft:20}}>
            <H3>{props.data.firstName + ' ' + props.data.lastName}</H3>
            <Text>{props.data.email}</Text>
            <Text>{data.selectedSubscription ? data.selectedSubscription.subscriptionNo : '' }</Text>
          </View>  
        </View>

      </View>
    </TouchableOpacity>  
  );
};

ProfileSummary.propTypes = {
  name: PropTypes.string
};

export default ProfileSummary;