import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {forgotPassword} from '../../../redux/ducks/userReducer';
import './ForgotPassword.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.forgotPassword(this.state.email);
  }

  render() {
    return (
      <div>
        <h1>Reset Password </h1>
        <div>
          Enter your email address:
          <form onSubmit={this.onSubmitHandler} className="">
            <input
              type="text"
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
              placeholder="Email Address"
            />
            <Link to="/login/owner/returning">
              <input type="submit" value="Submit" className="" />
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userReducer,
});

export default connect(mapStateToProps, {forgotPassword})(ForgotPassword);
