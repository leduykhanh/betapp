import React from 'react';
import { Text, View, ListItem, List, Left, Badge,Card, CardItem, H2 } from 'native-base';
import PropTypes from 'prop-types';
import WalletDetail from './WalletDetail';
import { Actions } from 'react-native-router-flux';

const Wallet = props => {
  
  const datas = props.details;

  const mapCardItem = () => {
    
    if (!datas || datas.length === 0) {
      return <Text>No Wallet Information</Text>;
    }
    
    return datas.map(data => (
      <View key={data.walletDetailId} itemDivider>
        <WalletDetail data={data} />
      </View>
    ));
  };

  return (
    <View style={{}}>
      
        <View style={{flexDirection:'row', margin: 20, padding:10, justifyContent:'space-between', borderBottomWidth:1}}>
          <Text subtitle-black>Currency</Text>
          <Text subtitle-black>Available Balance</Text>
        </View>
      
        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
            {mapCardItem(datas)}
        </View>
    
    </View>
  );
};

WalletDetail.propTypes = {
   details: PropTypes.array
};

export default Wallet;