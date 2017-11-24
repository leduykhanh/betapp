import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

const platform = Platform.OS;

const BetCard = props => {
  const { firstTeam } = props;
  return (
    <View>
      <Text>{firstTeam.name}</Text>
    </View>
  );
};

BetCard.propTypes = {
  firstTeam: PropTypes.object
};

export default BetCard;