
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

// Components
import { Card, Spacer, Text } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  featuredImage: {
    left: 0,
    right: 0,
    height: AppSizes.screen.height * 0.2,
    resizeMode: 'cover',
  },
});

/* Component ==================================================================== */
class BetView extends Component {
  static componentName = 'BetView';

  static propTypes = {
    firstTeam: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      
    }).isRequired,
  }



  render = () => {
    const { firstTeam } = this.props.bet;

    return (
      <ScrollView style={[AppStyles.container]}>

        <Card>
          <Text h2>{firstTeam.name}</Text>

        </Card>

      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default BetView;
