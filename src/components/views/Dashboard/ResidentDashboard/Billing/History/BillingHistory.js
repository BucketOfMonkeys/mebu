import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBillingHistory} from '../../../../../../redux/ducks/residentReducer';

import BillingItems from './BillingItems';
import './spreadsheet.css';

class BillingHistory extends Component {
  componentDidMount() {
    this.props.getBillingHistory();
  }

  render() {
    const styles = {
      width: '50%',
      height: '80%',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '1%',
      minHeight: '60vh',
      fontFamily: 'Raleway',
    };

    let mappedItems = [];

    const re = /\b(\d+)(\d{2})\b/;
    const subst = '$1.$2';

    if (this.props.billingHistory && this.props.billingHistory.length > 0) {
      mappedItems = this.props.billingHistory.map(item => (
        <BillingItems
          billid={item.billid}
          paid={item.paid}
          key={item.billid}
          amount={`$${Number(JSON.stringify(item.amount).replace(re, subst))}`}
          description={item.description}
        />
      ));
    }

    return (
      <div style={styles}>
        <table id="billing-items">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paid</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{mappedItems}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.residentReducer,
});

export default connect(mapStateToProps, {getBillingHistory})(BillingHistory);
