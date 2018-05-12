import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getResidentWorkOrder} from '../../../../../redux/ducks/workorderReducer';

import './WorkorderHistory.css';
import './WorkorderItems';
import WorkorderItems from './WorkorderItems';

import Workorder from './Workorder';

class WorkorderHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
    };
  }

  componentDidMount() {
    this.props.getResidentWorkOrder();
  }

  render() {
    const {workorders} = this.props;

    const open = workorders.filter(workorder => !workorder.dateend).map((order) => {
      const {
        workorderid, datestart, dateend, firstname, lastname, unitid, content,
      } = order;
      return (
        <Workorder
          workorderid={workorderid}
          datestart={datestart}
          dateend={dateend}
          content={content}
        />
      );
    });

    const closed = workorders.filter(workorder => workorder.dateend).map((order) => {
      const {
        workorderid, datestart, dateend, firstname, lastname, unitid, content,
      } = order;
      return (
        <Workorder
          workorderid={workorderid}
          datestart={datestart}
          dateend={dateend}
          content={content}
        />
      );
    });

    const all = workorders.map((order) => {
      const {
        workorderid, datestart, dateend, firstname, lastname, unitid, content,
      } = order;
      return (
        <Workorder
          workorderid={workorderid}
          datestart={datestart}
          dateend={dateend}
          content={content}
        />
      );
    });

    return (
      <div>
        <div onChange={e => this.setState({filter: e.target.value})}>
          <input
            type="radio"
            value="all"
            name="filter"
            required
            checked={this.state.filter === 'all'}
          />
          All
          <input type="radio" value="open" name="filter" checked={this.state.filter === 'open'} />
          Open
          <input
            type="radio"
            value="closed"
            name="filter"
            checked={this.state.filter === 'closed'}
          />
          Closed
        </div>

        <div className="WorkorderHistory">
          <div className="WorkorderHistory-title">Service History</div>
          <table className="WorkorderHistory-table">
            <thead>
              <tr className="Residents__table-header">
                <th>Work Order ID</th>
                <th>Date Start</th>
                <th>Date Completed</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filter === 'all' ? all : this.state.filter === 'closed' ? closed : open}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.workorderReducer,
});

export default connect(mapStateToProps, {getResidentWorkOrder})(WorkorderHistory);
