import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, ListItem, List, Content, Form, Item, Input, Label, Button, Title, Text, View, Spinner } from 'native-base';
import {RefreshControl, ListView, Image } from 'react-native';
import InfiniteScroll from 'react-native-infinite-scroll';
import { ImageBackground } from '../components/common';

import TransactionDetail from '../components/wallet/TransactionDetail';
import Footer from '../components/layout/Footer';
import {getTransactionHistory} from '../actions/walletActions';


class TransactionHistory extends Component {
  
  constructor(props){
    super();
    this.state = {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      datas: props.transactions,
      startingIndex: 0,
      pageSize: 10,
      refreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this),
      })
    };
    this.state.dataSource = this.getUpdatedDataSource(props);
  }
  
  componentWillMount(){
    if (this.props.profile.selectedSubscription)
      this.props.getTransactionHistory(this.props.profile.selectedSubscription.subscriptionId);
  }

  componentWillReceiveProps(nextProps) {
    // Trigger a re-render when receiving new props (when redux has more data).
    this.setState({
      dataSource: this.getUpdatedDataSource(nextProps),
    });
  }

  getUpdatedDataSource(props) {
    // See the ListView.DataSource documentation for more information on
    // how to properly structure your data depending on your use case.
    let transactions = props.transactions || [];

    let ids = transactions.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(transactions, ids);
  }

  _rowHasChanged(r1, r2) {
    // You might want to use a different comparison mechanism for performance.
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }

  _renderRefreshControl() {
    // Reload all data
    return (
      <RefreshControl
        refreshing={this.props.isFetching}
        onRefresh={this._onRefresh.bind(this)}
      />
    );
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.getTransactionHistory(this.props.profile.selectedSubscription.subscriptionId, 0 , this.state.pageSize);
    alert('refreshed');
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      datas: nextProps.transactions,
      refreshing:false
    });
  }
  
  renderRow(data){
   return (
     <ListItem style={{ backgroundColor: 'transparent'}}  itemDivider>
       <TransactionDetail data={data} />
     </ListItem>);
  }

  loadMorePage(){

    let pageSize = this.state.pageSize;
    let startingIndex = this.state.startingIndex;
    if (startingIndex < this.props.total) 
      this.setState({
        startingIndex: startingIndex + pageSize
      });
    // alert('111')  ;
    this.props.getTransactionHistory(this.props.profile.selectedSubscription.subscriptionId,startingIndex + pageSize, pageSize);
  }

  renderHistory() {
    
    if (this.props.transactions && this.props.transactions.length > 0) {
      return (
        <InfiniteScroll
          horizontal={false}  //true - if you want in horizontal
          onLoadMoreAsync={this.loadMorePage.bind(this)}
          distanceFromEnd={10} // distance in density-independent pixels from the right end
        >
          <List
            renderRow={data => this.renderRow(data)}
            dataArray={this.props.transactions}
            canLoadMore={this.state.startingIndex < this.props.total}
            refreshControl={
              this._renderRefreshControl()
            } />
        </InfiniteScroll>
      );
    } else {
      return (
        <Content>
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 40 }}>
          <Image source={require('../../assets/images/receipt_blue.png')} style={{ marginTop: 30, marginBottom: 20 }}/>
          <Text style={{textAlign: 'center'}}>You have no recent transactions. Top up your wallet to start using  KokuPay’s features!</Text>
        </View>
        </Content>
      );
    }
  }
  
  render() {
    return (
      <Container>      
        
        <ImageBackground>
          
            <View style={{ marginTop: 20, marginBottom: 14, paddingTop: 32, alignItems:'center' }}>
              <Text logo-text-style>Transaction History</Text>
            </View>
          
            {this.renderHistory()}
          
          <Footer />
        </ImageBackground>

      </Container>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    user: state.user,
    transactions: state.wallet.transactions,
    profile: state.profile,
    isFetching: state.wallet.isFetching,
    total: state.wallet.total,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTransactionHistory: (subId, startingIndex) => dispatch(getTransactionHistory(subId, startingIndex) )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionHistory);