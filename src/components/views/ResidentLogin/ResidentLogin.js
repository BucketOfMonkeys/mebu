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
    const {authenticated, loginSubmitted} = this.props;

    if (authenticated) {
      this.props.history.push('/resident/dashboard/');
    }

    let bc = 'var(--gray)';

    if (!authenticated && loginSubmitted) {
      bc = 'var(--red)';
    }

    return (
      <div className="ResidentLogin">
        <div className="ResidentLogin__container">
          <h3 className="ResidentLogin__header">Please sign into MEBU.</h3>
          <p className="ResidentLogin__subheader">Enter your details below.</p>
          <form className="ResidentLogin__form" onSubmit={this.onSubmitHandler}>
            <input
              className="ResidentLogin__input ResidentLogin__input--email"
              style={{borderColor: bc}}
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
              style={{borderColor: bc}}
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
        <div className="ResidentLogin__logo-container">
          <img className="ResidentLogin__logo" src={logo} alt="logo" />
          <h3 className="ResidentLogin__logo-header">Resident Portal</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userReducer,
});

export default connect(mapStateToProps, {loginResident})(ResidentLogin);
