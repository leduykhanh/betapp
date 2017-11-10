import React from 'react';
import {
  Scene,
  Router,
  Overlay,
  Drawer,
  Stack
} from 'react-native-router-flux';
import {StyleSheet, Platform} from 'react-native';
import DrawerContent from '../components/drawer/DrawerContent';
import MessageBar from '../components/MessageBar';

import {
  LoginScreen, DashboardScreen, TransactionHistoryScreen, TransferScreen,
   ProfileScreen, TransactionConfirmationScreen, DepositScreen, WithdrawScreen,
   ConvertScreen,ConvertConfirmationScreen, DepositConfirmationScreen, AddRecipientScreen,
   RecipientListScreen, WithdrawConfirmationScreen, WalletScreen, AddBeneficiaryScreen, BeneficiaryListScreen,
   TransferSuccessScreen, DepositSuccessScreen, ConvertSuccessScreen, WithdrawSuccessScreen
 } from '../screens';


let styles = {
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
  sceneHeaderStyle: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '400'
  }
};

if (Platform.OS === 'android') {
  styles.sceneHeaderStyle.marginLeft = -20;
}

const Routes = () => {
  return (
    <Router>
      <Overlay>
        <Stack key='root'>
          <Scene key="login" component={LoginScreen} hideNavBar initial/>
          
          <Drawer
            hideNavBar
            hideDrawerButton
            key="drawer"
            drawerPosition='right'
            contentComponent={DrawerContent}>
            <Scene key="dashboard" hideNavBar component={DashboardScreen} title="Dashboard" titleStyle={styles.sceneHeaderStyle}/>
            <Scene key="profile" navTransparent component={ProfileScreen} title="Profile" titleStyle={styles.sceneHeaderStyle}/>
            <Scene key="transaction_history" hideNavBar component={TransactionHistoryScreen} title="Transaction History" titleStyle={styles.sceneHeaderStyle}/>
            <Scene key="recipient_list" hideNavBar component={RecipientListScreen} back title="Recipients" titleStyle={styles.sceneHeaderStyle}/>
            <Scene key="wallet" hideNavBar component={WalletScreen} tabBarLabel='Wallet' title="Wallet" titleStyle={styles.sceneHeaderStyle}/>
            <Scene key="beneficiary_list" component={BeneficiaryListScreen} hideNavBar title="Beneficiary" titleStyle={styles.sceneHeaderStyle}/>
          </Drawer>
          
          <Scene key="transfer" navTransparent component={TransferScreen} back title="Transfer" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="convert" navTransparent component={ConvertScreen} back title="Convert" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="transfer_confirm" navTransparent component={TransactionConfirmationScreen} back title="Transfer" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="transfer_success" hideNavBar component={TransferSuccessScreen} title="Transfer Success" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="convert_success" hideNavBar component={ConvertSuccessScreen} title="Convert " titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="deposit_success" hideNavBar component={DepositSuccessScreen} title="Top up " titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="withdraw_success" hideNavBar component={WithdrawSuccessScreen} title="Withdraw" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="add_recipient" navTransparent component={AddRecipientScreen} back title="Add Recipient" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="convert_confirm" navTransparent component={ConvertConfirmationScreen} back title="Confirm Convert" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="deposit" navTransparent component={DepositScreen} back title="Top up" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="deposit_confirmation" navTransparent component={DepositConfirmationScreen} back title="Deposit" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="withdraw_confirmation" navTransparent component={WithdrawConfirmationScreen} back title="Withdraw" titleStyle={styles.sceneHeaderStyle}/>
          <Scene key="withdraw" navTransparent component={WithdrawScreen} back title="Withdraw" titleStyle={styles.sceneHeaderStyle}/>
          
          <Scene key="add_beneficiary" navTransparent component={AddBeneficiaryScreen} back title="Add a Beneficiary" titleStyle={styles.sceneHeaderStyle}/>
  
  
        </Stack>
        <Scene component={MessageBar} />
      </Overlay>
    </Router>
  )
};

export default Routes;