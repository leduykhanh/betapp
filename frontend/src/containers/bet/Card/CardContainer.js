/**
 * Individual Bet Card Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Actions
import * as BetActions from '@redux/bet/actions';

// Components
import BetCardRender from './CardView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  user: state.user
});

// Any actions to map to the component?
const mapDispatchToProps = {
  replaceFavourites: BetActions.replaceFavourites,
};

/* Component ==================================================================== */
class BetCard extends Component {
  static componentName = 'BetCard';

  static propTypes = {
    bet: PropTypes.shape({
      id: PropTypes.number.isRequired,
      state: PropTypes.string.isRequired,
      firstTeam: PropTypes.object.isRequired,

    }).isRequired,
    user: PropTypes.shape({
      token: PropTypes.string,
    }),
  }

  static defaultProps = {
    bet: null,
    user: null,
  }

  constructor(props) {
    super(props);
    this.state = { bet: props.bet };
  }

  componentWillReceiveProps(props) {
    if (props.bet) {
      this.setState({ bet: props.bet });
    }
  }

  /**
    * On Press of Card
    */
  onPressCard = () => {
    Actions.BetView({
      ...this.state.bet
    });
  }

  /**
    * When user taps to favourite a Bet
    */
  onPressFavourite = () => {

  }

  /**
    * Check in Redux to find if this Bet ID is a Favourite
    */
  isFavourite = () => {


    return false;
  }

  render = () => {
    const { bet } = this.state;
    const { user } = this.props;

    return (
      <BetCardRender
        title={Bet.title}
        body={Bet.body}
        image={Bet.image}
        onPress={this.onPressCard}
        onPressFavourite={(user && user.uid) ? this.onPressFavourite : null}
        isFavourite={(user && user.uid && this.isFavourite()) && true}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(BetCard);
