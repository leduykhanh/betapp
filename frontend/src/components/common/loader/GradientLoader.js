import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import LinearGradient from 'react-native-linear-gradient';


const GradientLoader = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      opacity: 1
    }
  },

  componentDidMount() {
    this.setInterval(() => {
      this.setState({
        opacity: this.state.opacity == 1? 0.5:this.state.opacity + 0.5
      });
    }, 500);
  },

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
         // colors={[this.state.colorTop, this.state.colorBottom]}
          colors={['rgba(238,238,238,'+this.state.opacity+')','rgba(216,216,216,'+this.state.opacity+')']}         
          style={styles.gradient} 
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
                      />

      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gradient: {
    width: 500,
    height: 15,
  },
});


export default GradientLoader;