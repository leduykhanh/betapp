import React from 'react';
import { Text, View, Badge, Right, H1, Button } from 'native-base';
import { Clipboard, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';

const BankDetail = props => {
  const data = props.data;
  return (
    <View withBorder style={{borderWidth:2,backgroundColor:'white', paddingBottom: 30}}>
      <View commonView>
        <Text subtitle-inactive>Transfer Amount:</Text>
        <Text>{data.amount}</Text>
      </View>  
      <View commonView>
        <Text subtitle-inactive>Recipients's Bank:</Text>
        <Text>{data.bankName}</Text>
      </View>  
      <View commonView>
        <Text subtitle-inactive>Recipients's Name:</Text>
        <Text>N4P Pte Ltd</Text>
      </View>

      <View commonView>
        <Text subtitle-inactive> Account Number:</Text>
        
        <View with-shadow  style={{ flexDirection:'row', backgroundColor:'white', borderRadius:10, 
          justifyContent:'space-between', alignItems:'center', paddingLeft:15, borderWidth:1}} withBorder>
          <Text>{data.accountNo}</Text>
          <Button style={{borderBottomRightRadius:10,borderTopRightRadius:10,}} 
          onPress={()=>{Clipboard.setString(data.accountNo);ToastAndroid.show('Copied to clipboard', ToastAndroid.LONG);}}>
            <Text body-text-style-white>COPY</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

BankDetail.propTypes = {
    bankName: PropTypes.string
};

export default BankDetail;