import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {loginResident} from '../../../redux/ducks/userReducer';
import logo from '../../../images/logo_final_white.svg';
import './ResidentLogin.css';

class ResidentLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.loginResident(this.state.email, this.state.password);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    if (this.props.authenticated) {
      this.props.history.push('/resident/dashboard/');
    }

    return (
      <div className="ResidentLogin">
        <div className="login-container">
          <h3 className="residentlogin-header">Please sign into MEBU.</h3>
          <p className="residentlogin-subheader">Enter your details below.</p>
          <form className="ResidentLogin__form" onSubmit={this.onSubmitHandler}>
            <input
              className="ResidentLogin__input ResidentLogin__input--email"
              value={this.state.email}
              placeholder="email"
              name="email"
              type="email"
              required
              autoFocus
              onChange={this.handleChange}
            />
            <input
              className="ResidentLogin__input ResidentLogin__input--password"
              value={this.state.password}
              placeholder="password"
              name="password"
              type="password"
              required
              onChange={this.handleChange}
            />
            <input type="submit" className="ResidentLogin__submit" value="Login" />
          </form>
          <div>
            <Link className="ResidentLogin__link Link__none" to="/forgotpassword">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="logo-container-registration-log">
          <img className="ResidentLogin__logo" src={logo} alt="logo" />
          <h3 className="Residentlogin-logo-header">Resident Portal</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userReducer,
});

export default connect(mapStateToProps, {loginResident})(ResidentLogin);
