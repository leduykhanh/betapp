import React from 'react';
import { Text, View, Badge, H2, Card, Button } from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

function populateColor(status: string) {
  let color;
  
  switch (status) {
    case 'PENDING': {
      color = '#d8a430';
      break;
    }
    case 'COMPLETED': {
      color = '#4ccc45';
      break;
    }
    case 'CANCELLED': {
      color = '#cfcfcf';
      break;
    }
  }
  
  return color;
}

function populateAmount(currency, amount = 0, type) {
  if (type === 'IN') {
    return (
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4ccc45'}}>{currency} {amount.toLocaleString()}</Text>
    );
  } else {
    return (
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red'}}>- {currency} {amount.toLocaleString()}</Text>
    );
  }
}

const TransactionDetailCard = props => {
  
  const data = props.data;
  
  let body;
  
  const color = populateColor(data.status);
  
  switch (data.action) {
    
    case 'DEPOSIT': {
      body = (
        <View style={{justifyContent:'flex-end',height: 80, paddingBottom: 10}}>
          {populateAmount(data.currency, data.amount, data.transactionType)}
          <Text style={{ fontSize: 10 }}>
            to {data.currency} Wallet
          </Text>
        </View>
      );
      break;
    }
  
    case 'WITHDRAW': {
      
      const type = data.transactionType === 'IN'? 'to' : 'from';
      
      body = (
        <View style={{justifyContent:'flex-end',height: 80, paddingBottom: 10}}>
          {populateAmount(data.currency, data.amount, data.transactionType)}
          <Text style={{ fontSize: 10 }}>
            {type} {data.currency} Wallet
          </Text>
        </View>
      );
      break;
    }
  
    case 'TRANSFER': {
    
      const type = data.transactionType === 'IN'? 'to' : 'from';
    
      body = (
        <View style={{justifyContent:'flex-end',height: 80, paddingBottom: 10}}>
          {populateAmount(data.currency, data.amount, data.transactionType)}
          <Text style={{ fontSize: 10 }}>
            {type} {data.currency} Wallet
          </Text>
        </View>
      );
      break;
    }
  
    case 'CONVERT': {
      const additional = data.additional ? data.additional : {};
      
      body = (
        <View style={{justifyContent:'flex-end',height: 80, paddingBottom: 10}}>
          {populateAmount(data.currency, data.amount, 'OUT')}
          <Text style={{ fontSize: 10 }}>
            from {data.currency} Wallet
          </Text>
  
          {populateAmount(additional.toCurrency, additional.toAmount, 'IN')}
          <Text style={{ fontSize: 10 }}>
            to {additional.toCurrency} Wallet
          </Text>
        </View>
      );
      break;
    }
  }
  
  return (
    <View style={{borderRadius:5,
                  borderColor:color,
                  borderWidth: 2,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.5,
                  shadowRadius: 1,
                  width:196,
                  height: 115,
                  backgroundColor: 'white',
                  padding: 10,
                  margin: 5}}>
      
      <View style={{flexDirection: 'row'}}>
        <Text text-style style={{ flex: 1, justifyContent: 'flex-start'}}>{data.action}</Text>
        
        <View style={{backgroundColor: color, borderRadius: 10, paddingLeft: 10, paddingRight: 10}}>
          <Text style={{fontSize: 10, lineHeight: 18}}>{data.status.toUpperCase()}</Text>
        </View>
        
      </View>
      
      {body}
      
    </View>
  );
};

TransactionDetailCard.propTypes = {
};

export default TransactionDetailCard;