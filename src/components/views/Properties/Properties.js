import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';

import {getProperties} from '../../../redux/ducks/propertyReducer';
import {logoutUser} from '../../../redux/ducks/userReducer';
import logo from '../../../images/logo_final_blue.svg';
import './Properties.css';

class Properties extends Component {
  componentDidMount() {
    this.props.getProperties();
  }

  onLogout() {
    axios
      .get('/users/logout')
      .then((response) => {
        this.props.logoutUser();
        return this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    const {
      properties, loading, error, current_user,
    } = this.props;
    const propertiesDisplay =
      properties &&
      properties[0] &&
      !loading &&
      properties.map(property => (
        <Link
          className="Property-card"
          key={property.propertyid}
          to={`/owner/dashboard/property/${property.propertyid}`}
        >
          <img className="Properties__photo" src={property.photourl} alt="apartment" />
          <h3 className="Properties__name">{property.name}</h3>
          <div className="Properties-imageOverlay">
            <p className="Properties__address">{property.address}</p>
            <p className="Properties__units">Number of units: {property.units}</p>
          </div>
        </Link>
      ));

    let user = <p>...loading</p>;
    if (current_user) {
      const name = current_user;
      user = (
        <h1 className="Properties__welcome">
          Welcome,{' '}
          <p className="Properties__welcome-name">
            {name.firstName} {name.lastName}
          </p>
        </h1>
      );
    }

    return (
      <div className="Properties">
        <div className="Properties-navbar">
          {user}
          <h2 className="Properties-navbar-header">My Properties</h2>

          <Link
            className="Properties__button Properties__button--add Link__none"
            to="/owner/properties/new"
          >
            Add Property
          </Link>
          <button
            className="Properties__button Properties__button--logout"
            onClick={() => this.onLogout()}
          >
            Logout
          </button>
          <img className="Properties__logo" src={logo} alt="logo" />
        </div>
        <div className="Properties__all">{propertiesDisplay}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.propertyReducer,
  ...state.userReducer,
});

export default withRouter(connect(mapStateToProps, {getProperties, logoutUser})(Properties));
