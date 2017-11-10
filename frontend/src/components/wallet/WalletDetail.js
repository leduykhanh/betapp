import React from 'react';
import { Text, View, Badge, Right } from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import toLocaleString from '../../utils/numberHelper';

const WalletDetail = props => {
  const data = props.data;
  return (
    <View style={{flexDirection:'row',
      justifyContent:'space-between',
      borderColor: 'grey',
      borderBottomWidth:2,
      margin:20,
      padding:10, marginTop: 0 }}>
      
      <Text body-text-style>{`${data.currency}`}</Text>
      
      <View style={{alignItems:'flex-end'}}>
        <Text body-text-style>{`${toLocaleString(data.availableBalance)}`}</Text>
        {data.pendingIn?<Text green>{`Pending +${toLocaleString(data.pendingIn)}`}</Text>:null}
        {data.pendingOut?<Text red>{`Pending -${toLocaleString(data.pendingOut)}`}</Text>:null}
      </View>

    </View>
  );
};

WalletDetail.propTypes = {
  availableBalance: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
};

export default WalletDetail;