import React from 'react';
import { Text, View, Badge, Right, H3 } from 'native-base';
import PropTypes from 'prop-types';

const SectionView = props => {
  return (
    <View>
       <View horizontal style={{backgroundColor:'#243fad', padding: 5}}> 
       	{props.number?
       		<View style={{width:25, height:25, borderColor:'white', borderWidth:1, justifyContent: 'center', alignItems: 'center',  borderRadius: 13}}>
       			<Text style={{color: 'white'}}>{props.number + ''}</Text>
   			</View>
   			: <Text></Text>}
            <Text style={{color: 'white'}}>  {props.headerText}</Text>
        </View>
        <View style={{paddingBottom:20, paddingTop:20}}>
          {props.children}
        </View>  
    </View>
  );
};

SectionView.propTypes = {
    headerText: PropTypes.string
};

export default SectionView;