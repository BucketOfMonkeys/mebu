import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {createOwner} from '../../../redux/ducks/userReducer';
import logo from '../../../images/logo2-nobg.png';
import './OwnerRegistration.css';

class OwnerRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    return this.setState({[e.target.name]: e.target.value});
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      // this.props.register({...this.state});
    }
  }

  render() {
    const {
      firstName, lastName, companyName, email, password, confirmPassword,
    } = this.state;

    if (this.props.authenticated) {
      this.props.history.push('/owner/properties');
    }

    return (
      <div className="OwnerRegistration">
        <div className="logo-container-owner-reg">
          <img className="OwnerRegistration__logo" src={logo} alt="logo" />
          <h3 className="ownerlogin-logo-header">Owner Registration Portal</h3>
        </div>
        <div className="login-container">
          <h3 className="ownerRegistration-header">
            To register for an account, <br /> complete the form below.
          </h3>
          <div className="OwnerRegistration__form">
            <form onSubmit={this.onSubmitHandler}>
              <input
                className="OwnerRegistration__input OwnerRegistration__input--firstname"
                onChange={this.onChangeHandler}
                required
                placeholder="first name"
                name="firstName"
                maxLength="35"
                value={firstName}
                type="text"
              />
              <input
                className="OwnerRegistration__input OwnerRegistration__input--lastname"
                onChange={this.onChangeHandler}
                required
                placeholder="last name"
                name="lastName"
                maxLength="35"
                value={lastName}
                type="text"
              />
              <input
                className="OwnerRegistration__input OwnerRegistration__input--companyname"
                onChange={this.onChangeHandler}
                placeholder="company name"
                name="companyName"
                value={companyName}
                type="text"
              />
              <input
                className="OwnerRegistration__input OwnerRegistration__input--email"
                onChange={this.onChangeHandler}
                required
                placeholder="email"
                name="email"
                value={email}
                type="email"
              />
              <input
                className="OwnerRegistration__input OwnerRegistration__input--password"
                onChange={this.onChangeHandler}
                required
                placeholder="password"
                name="password"
                value={password}
                type="password"
              />
              <input
                className="OwnerRegistration__input OwnerRegistration__input--confirmpassword"
                onChange={this.onChangeHandler}
                required
                placeholder="confirm password"
                name="confirmPassword"
                value={confirmPassword}
                type="password"
              />
              <button
                className="OwnerRegistration-button"
                onClick={() =>
                  this.props.createOwner(
                    this.state.email,
                    this.state.password,
                    this.state.firstName,
                    this.state.lastName,
                    this.state.companyName,
                  )
                }
              >
                Continue
              </button>
            </form>
          </div>
          <p className="registration-submit-policy">
            By clicking "Continue" I agree to Mebu's Terms of Service and Privacy Policy.
          </p>
          <div className="OwnerRegistration__sign-in">
            Already have an account with Mebu?{' '}
            <Link className="Link__none" to="/login/owner/returning">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

OwnerRegistration.propTypes = {
  createOwner: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ...state.userReducer,
});

export default connect(mapStateToProps, {createOwner})(OwnerRegistration);
