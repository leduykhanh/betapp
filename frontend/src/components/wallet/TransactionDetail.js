import React from 'react';
import { Text, View, Badge, H2, Card, Button } from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

function getAmountText(currency, amount, type) {
  if (type === 'IN') {
    return (
      <Text style={{ color: '#4ccc45' }}>{currency} {amount.toLocaleString()}</Text>
    );
  } else {
    return (
      <Text style={{ color: 'red'}}>- {currency} {amount.toLocaleString()}</Text>
    );
  }
  
}

function generateTag(status) {
  
  if (status === "COMPLETED") {
    return (
      <View style={{ alignItems: 'flex-end', paddingTop: 10}}>
        <View style={{backgroundColor: '#4ccc45', borderRadius: 10, paddingLeft: 10, paddingRight: 10}}>
          <Text style={{fontSize: 10, lineHeight: 18}}>{status.toUpperCase()}</Text>
        </View>
      </View>
    );
  } else if (status === "PENDING") {
    return (
      <View style={{ alignItems: 'flex-end', paddingTop: 10}}>
        <View style={{backgroundColor: '#d8a430', borderRadius: 10, paddingLeft: 10, paddingRight: 10}}>
          <Text style={{fontSize: 10, lineHeight: 18}}>{status.toUpperCase()}</Text>
        </View>
      </View>
    );
  }
  
}

function populateCardContent(data) {
  
  switch (data.action) {
    
    case 'DEPOSIT' : {
    
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
          
            <View style={{ flex: 1 }}>
              <Text text-style>{data.action}</Text>
              <Text subtitle-inactive>to {data.currency} Wallet</Text>
            </View>
          
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {getAmountText(data.currency, data.amount, data.transactionType)}
            </View>
        
          </View>
        
          {generateTag(data.status)}
      
        </View>
      );
    }
    case 'WITHDRAW' : {
    
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
          
            <View style={{ flex: 1 }}>
              <Text text-style>{data.action}</Text>
              <Text subtitle-inactive>to {data.currency} Wallet</Text>
            </View>
          
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {getAmountText(data.currency, data.amount, data.transactionType)}
            </View>
        
          </View>
        
          {generateTag(data.status)}
      
        </View>
      );
    }
    case 'TRANSFER' : {
      
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
    
            <View style={{ flex: 1 }}>
              <Text text-style>{data.action}</Text>
              <Text subtitle-inactive>to SGD Wallet</Text>
            </View>
    
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {getAmountText(data.currency, data.amount, data.transactionType)}
            </View>
  
          </View>
          
          {generateTag(data.status)}

        </View>
      );
    }
    case 'CONVERT' : {
      const additional = data.additional? data.additional : {};
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
          
            <View style={{ flex: 1 }}>
              <Text text-style>{data.action}</Text>
              <Text subtitle-inactive>from {data.currency} Wallet</Text>
              <Text subtitle-inactive>to {additional.toCurrency} Wallet</Text>
            </View>
          
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {getAmountText(data.currency, data.amount, 'OUT')}
              {getAmountText(additional.toCurrency, additional.toAmount, 'IN')}
            </View>
        
          </View>
  
          {generateTag(data.status)}
        </View>
      );
    }
    
    default: {
      return (
        <View>
          <Text>No View</Text>
        </View>
      );
    }
  }
  
}

const TransactionDetail = props => {
  
  let data = props.data;
  let formattedDate = moment(data.lastActionOn).format('DD MMM YY HH:mm ZZ');
  let flow = data.transactionType == 'OUT'? '-' : '+';
  let color = data.transactionType == 'OUT'? 'red' : 'green';
  
  return (
    <Card style={{padding:10, borderRadius: 4}}>
      
      <Text style={{ fontSize: 12, paddingBottom: 10, color: '#aaa'}}>{formattedDate}</Text>
      {populateCardContent(data)}
      
    </Card>
  );
};

TransactionDetail.propTypes = {
};

export default TransactionDetail;