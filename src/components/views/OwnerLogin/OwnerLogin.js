import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginOwner} from '../../../redux/ducks/userReducer';
import logo from '../../../images/logo_final_white.svg';

import './OwnerLogin.css';

class OwnerLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.loginOwner(this.state.email, this.state.password);
  }

  handleChangeEmail(value) {
    this.setState({email: value});
  }

  handleChangePassword(value) {
    this.setState({password: value});
  }

  render() {
    if (this.props.authenticated) {
      this.props.history.push('/owner/properties');
    }

    return (
      <div className="OwnerLogin">
        <div className="logo-container">
          <img className="OwnerLogin__logo" src={logo} alt="logo" />
          <h3 className="ownerlogin-logo-header">Owner Login Portal</h3>
        </div>
        <div>
          <form onSubmit={this.onSubmitHandler} className="login-container">
            <div>
              <h3 className="ownerlogin-header">Please sign into MEBU.</h3>
              <p className="ownerlogin-subheader">Enter your details below.</p>
              <input
                className="OwnerLogin__input OwnerLogin__input--email"
                value={this.state.email}
                placeholder="email"
                type="email"
                required
                autoFocus
                onChange={e => this.handleChangeEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="OwnerLogin__input OwnerLogin__input--password"
                value={this.state.password}
                placeholder="password"
                type="password"
                required
                onChange={e => this.handleChangePassword(e.target.value)}
              />
            </div>
            <input value="Login" type="submit" className="OwnerLogin__submit" />
          </form>
          <div>
            <Link className="OwnerLogin__link Link__none" to="/owner/forgotpassword">
              Forgot Password?
            </Link>
          </div>
          <div className="OwnerLogin__footer">
            Don't have an account?
            <Link className="OwnerLogin__link Link__none" to="/login/owner/new">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userReducer,
});

export default connect(mapStateToProps, {loginOwner})(OwnerLogin);
