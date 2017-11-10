import React from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Content, ListItem, Text, Radio, Right, Button } from 'native-base';
import RecipientDetail from './RecipientDetail';

const RecipientListModal = props => {
  
  const generateRow = (data) => {
    
    return data.map((d, i) => {
      let bgColor = props.recipientId === i ? 'grey': 'white';
      return (
          <ListItem style={{ backgroundColor: bgColor }} key={i} itemDivider onPress={() => props.onRecipientSelect(i)}>       
            <RecipientDetail key={i} name={d.name}/>            
            <Right>
              <Radio selected={props.recipientId === i} />
            </Right>
          </ListItem>
        )
  }
  );
  };
  
  return (
    <Modal animationType="slide"
           transparent={false}
           visible={props.modalVisible}
           onRequestClose={() => {alert("Modal has been closed.")}} >
      
      <View style={{marginTop: 22, justifyContent:'center'}}>
        {generateRow(props.data)}
        <View style={{marginTop: 22, justifyContent:'center', flexDirection:'row'}}>
          <Button rounded onPress={props.addRecipient}>
            <Text>Add recipient</Text>
          </Button>        
          <Button success rounded onPress={props.close}>
            <Text>Confirm</Text>
          </Button>
        </View>
      </View>
      
    </Modal>
  );
};

RecipientListModal.propTypes = {
  recipientId: PropTypes.number, // Rename to index
  onRecipientSelect: PropTypes.func
};

export default RecipientListModal;