import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Spinner, View } from 'native-base';
import * as moment from 'moment';

class CountdownTimer extends React.Component {
  
  constructor(props) {
    super(props);

    this.tick = this.tick.bind(this);
    this.getRemaining = this.getRemaining.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
    this.getStyle = this.getStyle.bind(this);
  }

  componentDidMount() {
    this.remainingSec = this.props.remaining;
    this.setState({ secondsRemaining: this.props.remaining });
    
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUpdate() {
    if (this.remainingSec !== this.props.remaining) {
      this.remainingSec = this.props.remaining;
      this.setState({ secondsRemaining: this.props.remaining });
    }
  }
  
  componentWillReceiveProps(nextProps) {
   
    if (this.state.secondsRemaining !== nextProps.remaining) {
      this.remainingSec = nextProps.remaining;
      this.setState({ secondsRemaining: nextProps.remaining });
    }
  }

  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  tick() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {      
      if (this.props.timerEndCallBack) {
        this.setState({ secondsRemaining: 60 });
        this.props.timerEndCallBack();
      }
      else{
        clearInterval(this.interval);
      }
    }
  }

  getRemaining() {
    if (this.state) {
        return this.state.secondsRemaining
    }

    return '';
  }

  getPercentage() {

    if (this.state) {

      if (this.state.secondsRemaining <= 0) {
        return 0;
      }

      return (this.state.secondsRemaining / this.props.total) * 100;
    }

    return 0;
  }

  getStyle() {
    if (this.state) {
      if (this.state.secondsRemaining >= 3600) {
        return 'txt-color-green';
      } else if (this.state.secondsRemaining >= 60) {
        return 'txt-color-orange';
      } else {
        return 'txt-color-red';
      }
    }
  }
  
  render() {
    return (
      <Text>
        {this.getRemaining()}
      </Text>
    );
  }
}

CountdownTimer.propTypes = {
  total: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  timerEndCallBack: PropTypes.func
};


export default CountdownTimer;
