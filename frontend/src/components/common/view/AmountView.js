import React from 'react';
import { Text, Input, Spinner, View, Picker, Item } from 'native-base';
import CurrencyModal from '../popup/CurrencyModal';
import PropTypes from 'prop-types';

const AmountView = props => {

  return (
    <View amountView style={{borderWidth:1, flexDirection:'row'}}>

      
      <Input
              style={{borderRightWidth:props.loading?0:1, paddingLeft: 20, fontSize: 26, borderColor: '#4740c7'}}
              value={props.amount+''}
              onChangeText={props.onChangeAmount}
              onBlur={props.onBlur}
              arrowColour='blue'
              keyboardType = 'numeric' />
      {/* <Picker
          style={{height:20, width:100}}
          mode="dropdown"
          placeholder="Select One"
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}>
          {props.list.map(detail=><Item key={detail[props.aKey]} label={detail[props.aKey]} value={detail[props.aValue]}  />)} 
      </Picker>*/}
      {props.loading?<Spinner small/>:<Text></Text>}
      <CurrencyModal 
          list={props.list}
          selectedCurrency={props.selectedValue}
          onValueChange={props.onValueChange}
          aKey={props.aKey}
          aValue={props.aValue}/>
      
    </View>
);
};

AmountView.propTypes = {

};

export default AmountView;