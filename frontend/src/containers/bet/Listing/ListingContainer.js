/**
 * List of Bets for a Meal Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import * as BetActions from '@redux/Bets/actions';

// Components
import Loading from '@components/general/Loading';
import BetListingRender from './ListingView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  Bets: state.Bet.Bets || [],
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getBets: BetActions.getBets,
};

/* Component ==================================================================== */
class MealListing extends Component {
  static componentName = 'MealListing';

  static propTypes = {
    bets: PropTypes.arrayOf(PropTypes.object),
    getBets: PropTypes.func.isRequired,
  }

  static defaultProps = {
    bets: [],
  }

  state = {
    loading: false,
    bets: [],
  }

  componentDidMount = () => this.getThisMealsBets(this.props.bets);
  componentWillReceiveProps = props => this.getThisMealsBets(props.bets);

  /**
    * Pick out Bets that are in the current meal
    * And hide loading state
    */
  getThisMealsBets = (allBets) => {
    if (allBets.length > 0) {
      const bets = allBets.filter(Bet =>
        Bet.category.toString() === this.props.meal.toString(),
      );

      this.setState({
        bets,
        loading: false,
      });
    }
  }

  /**
    * Fetch Data from API
    */
  fetchBets = () => this.props.getBets()
    .then(() => this.setState({ error: null, loading: false }))
    .catch(err => this.setState({ error: err.message, loading: false }))

  render = () => {
    if (this.state.loading) return <Loading />;

    return (
      <BetListingRender
        Bets={this.state.bets}
        reFetch={this.fetchBets}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealListing);
