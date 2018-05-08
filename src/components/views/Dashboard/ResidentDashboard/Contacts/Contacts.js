import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getResidentInfo} from '../../../../../redux/ducks/residentReducer';
import './Contacts.css';

class Contacts extends Component {
  componentDidMount() {
    this.props.getResidentInfo();
  }

  render() {
    const {residentInfo, loading, error} = this.props;

    let residentInfoDisplay = <p>Loading...</p>;
    if (Object.keys(residentInfo).length > 0 && !loading && !error) {
      residentInfoDisplay = (
        <div className="Contacts-container">
          <div className="Contacts-resident-info">
            <div>
              <h3>Property</h3>
              <p>Name: {residentInfo.name}</p>
              <p>Address: {residentInfo.address}</p>
              <p>Image: {residentInfo.photourl}</p>
            </div>
            <div>
              <h3>Owner</h3>
              <p>First Name: {residentInfo.firstname}</p>
              <p>Last Name: {residentInfo.lastname}</p>
              <p>Email: {residentInfo.email}</p>
            </div>
            <div>
              <h3>Details about you: </h3>
              <p>Monthly Rent: {residentInfo.rent}</p>
              <p>Room Number: {residentInfo.roomnum}</p>
            </div>
          </div>
        </div>
      );
    }

    return <div>{residentInfoDisplay}</div>;
  }
}

const mapStateToProps = state => ({...state.residentReducer});

export default connect(mapStateToProps, {getResidentInfo})(Contacts);
