import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getResidentsByUnitId} from '../../../../../redux/ducks/residentReducer';
import './ResidentsByUnit.css';

class ResidentsByUnit extends Component {
  componentDidMount() {
    this.props.getResidentsByUnitId(this.props.match.params.unitid);
  }

  render() {
    const {residents, loading} = this.props;
    let residentsDisplay = <p>Loading...</p>;
    if (residents && residents.length > 0 && !loading) {
      residentsDisplay = residents.map(({
        email, firstname, lastname, isresident,
      }) => (
        <Fragment>
          <p>{email}</p>
          <p>{firstname}</p>
          <p>{lastname}</p>
          <p>{isresident ? 'Yes' : 'No'}</p>
        </Fragment>
      ));
    }
    return (
      <Fragment>
        <div className="ResidentsByUnit">
          <p>email</p>
          <p>firstname</p>
          <p>lastname</p>
          <p>isresident</p>
          {residentsDisplay}
        </div>
        <Link
          to={`/owner/dashboard/property/${this.props.match.params.id}/units/${
            this.props.match.params.unitid
          }/residents/new`}
        >
          Add Resident
        </Link>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({...state.residentReducer});

export default connect(mapStateToProps, {getResidentsByUnitId})(ResidentsByUnit);
