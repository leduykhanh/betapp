import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';

const labels = ["Step 1", "Step 2", "Step 3"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
};


const StepIndicatorComponent = (props) =>{
  return (
    <StepIndicator
         {...props}
         customStyles={customStyles}
         stepCount={3}
         labels={labels}
    />
  )};
StepIndicatorComponent.propTypes = {
  currentPosition: PropTypes.number.isRequired
}
export default StepIndicatorComponent;