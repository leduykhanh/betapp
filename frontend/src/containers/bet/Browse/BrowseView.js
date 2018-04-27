/**
 * Receipe Tabs Screen
 *  - Shows tabs, which contain receipe listings
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

// Consts and Libs
import { AppColors } from '@theme/';

// Containers
import RecipeListing from '@containers/recipes/Listing/ListingContainer';

// Components
import { Text } from '@ui/';
import Loading from '@components/general/Loading';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  // Tab Styles
  tabContainer: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: AppColors.brand.primary,
  },
  tabbarIndicator: {
    backgroundColor: '#FFF',
  },
  tabbarText: {
    color: '#FFF',
  },
});

/* Component ==================================================================== */
let loadingTimeout;
class RecipeTabs extends Component {
  static componentName = 'RecipeTabs';

  static propTypes = {
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static defaultProps = {
    bets: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,

    };
  }

 

  render = () => {
    if (this.state.loading) return <Loading />;

    return (

    );
  }
}

/* Export Component ==================================================================== */
export default RecipeTabs;
