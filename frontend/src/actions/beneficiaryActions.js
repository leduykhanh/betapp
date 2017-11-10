import { MessageBarManager } from 'react-native-message-bar';
import { Actions } from 'react-native-router-flux';
import * as constants from '../constants';
import * as BeneficiaryApi from '../api/BeneficiaryApi';

export function getBeneficiaryList(subscriptionId) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_GET_BENEFICIARY_PENDING
    });
  
    BeneficiaryApi.getBeneficiaryList(subscriptionId).then((response) => {
      
      dispatch({
        type: constants.STATE_GET_BENEFICIARY_SUCCESS,
        payload: response.data
      });
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_GET_BENEFICIARY_ERROR,
        error
      });
      
    });

  }
}

export function createBeneficiary(subscriptionId, data) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_ADD_BENEFICIARY_PENDING
    });
  
    BeneficiaryApi.createBeneficiary(subscriptionId, data).then((response) => {
      
      // Actions.dashboard();
      // Actions.refresh();
      Actions.replace('beneficiary_list');
      
      dispatch({
        type: constants.STATE_ADD_BENEFICIARY_SUCCESS,
        payload: response.data
      });
      
      MessageBarManager.showAlert({
        position: 'bottom',
        animationType: 'SlideFromLeft',
        title: 'Successful',
        message: 'New Beneficiary added',
        duration: 3000,
        alertType: 'success'
      });
      
    }).catch((error) => {
    
      dispatch({
        type: constants.STATE_ADD_BENEFICIARY_ERROR,
        error
      });
      
    });

  }
}

export function deleteBeneficiary(subscriptionId, beneficiaryId) {
  return dispatch => {
    
    dispatch({
      type: constants.STATE_DELETE_BENEFICIARY_PENDING
    });
  
    BeneficiaryApi.deleteBeneficiary(subscriptionId, beneficiaryId).then((response) => {
      
      // Actions.pop();
      Actions.refresh();
      // Actions.replace('beneficiary_list');
      dispatch({
        type: constants.STATE_DELETE_BENEFICIARY_SUCCESS,
        payload: beneficiaryId
      });
      
      MessageBarManager.showAlert({
        position: 'bottom',
        animationType: 'SlideFromLeft',
        title: 'Successful',
        message: 'Beneficiary removed',
        duration: 3000,
        alertType: 'success'
      });
      
    }).catch((error) => {
      
      dispatch({
        type: constants.STATE_DELETE_BENEFICIARY_ERROR,
        error
      });
      
    });

  }
}