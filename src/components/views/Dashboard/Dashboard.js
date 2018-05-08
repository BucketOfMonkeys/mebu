import React, {Component} from 'react';
import axios from 'axios';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../../redux/ducks/userReducer';
import './Dashboard.css';

class Dashboard extends Component {
  onLogout() {
    console.log('logging out!');
    axios
      .get('/users/logout')
      .then((response) => {
        this.props.logoutUser();
        return this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    const {path, params} = this.props.match;
    console.log(this.props);
    return path.includes('/owner/') ? (
      <div className="Dashboard">
        <div className="Dashboard__top">
          <p>TopBar</p>
        </div>
        <nav className="Dashboard__nav">
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Dashboard__link--back Link__none"
            to="/owner/properties"
          >
            Back
          </NavLink>
          <NavLink
            exact
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to={`/owner/dashboard/property/${params.id}`}
          >
            Home
          </NavLink>
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to={`/owner/dashboard/property/${params.id}/units`}
          >
            Units
          </NavLink>
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to={`/owner/dashboard/property/${params.id}/residents`}
          >
            Residents
          </NavLink>
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to={`/owner/dashboard/property/${params.id}/metrics`}
          >
            Metrics
          </NavLink>
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to={`/owner/dashboard/property/${params.id}/maintenance`}
          >
            Maintenance
          </NavLink>
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to={`/owner/dashboard/property/${params.id}/settings`}
          >
            Settings
          </NavLink>
          {/* {this.props.current_user.userid ? ( */}
          <button className="Dashboard__link" onClick={() => this.onLogout()}>
            Logout
          </button>
          {/* ) : ( */}
          {/* '' */}
          {/* )} */}
        </nav>
        <div className="Dashboard__body">{this.props.children}</div>
      </div>
    ) : (
      <div className="Dashboard">
        <div className="Dashboard__top">
          <p>TopBar</p>
        </div>
        <nav className="Dashboard__nav">
          <NavLink
            exact
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to="/resident/dashboard/"
          >
            Contacts
          </NavLink>
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to="/resident/dashboard/billing/pay"
          >
            Pay Bills
          </NavLink>
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to="/resident/dashboard/billing/history"
          >
            Billing History
          </NavLink>
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to="/resident/dashboard/maintenance/create"
          >
            Maintenance Request
          </NavLink>
          <NavLink
            activeClassName="Dashboard__link--active"
            className="Dashboard__link Link__none"
            to="/resident/dashboard/maintenance/history"
          >
            Maintenance History
          </NavLink>
          <button className="Dashboard__link" onClick={() => this.onLogout()}>
            Logout
          </button>
        </nav>
        <div className="Dashboard__body">{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userReducer,
});

export default withRouter(connect(mapStateToProps, {logoutUser})(Dashboard));
