import React, {Component} from 'react';
import {getResidentWorkOrder} from '../../../../../redux/ducks/workorderReducer';
import {connect} from 'react-redux';

class WorkorderHistory extends Component {
  componentDidMount() {
    this.props.getResidentWorkOrder();
  }

  render() {
    const workorders =
      this.props.workorders &&
      this.props.workorders[0] &&
      this.props.workorders.map(workorder => (
        <div>
          <div>Work order ID: {workorder.workorderid}</div>
          <div>Date Start: {workorder.datestart}</div>
          <div>Content: {workorder.content}</div>
          <div>Date End: {workorder.dateend}</div>
        </div>
      ));
    return <div>{workorders}</div>;
  }
}

const mapStateToProps = state => ({
  ...state.workorderReducer,
});

export default connect(mapStateToProps, {getResidentWorkOrder})(WorkorderHistory);
