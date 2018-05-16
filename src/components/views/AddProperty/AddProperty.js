import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {createProperty} from '../../../redux/ducks/propertyReducer';
import {logoutUser} from '../../../redux/ducks/userReducer';
import logo from '../../../images/logo_final_blue.svg';
import './AddProperty.css';

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      value: '',
      units: '',
      expenses: '',
      photourl: '',
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e) {
    const {
      name, address, value, units, expenses, photourl,
    } = this.state;
    e.preventDefault();
    this.props.createProperty({
      name,
      address,
      value,
      units,
      expenses,
      photourl,
    });
    this.props.history.push('/owner/properties');
  }

  onChangeHandler(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onLogout() {
    axios
      .get('/users/logout')
      .then((response) => {
        this.props.logoutUser();
        return this.props.history.push('/');
      })
      .catch(err => err);
  }

  render() {
    const {
      name, address, value, units, expenses, photourl,
    } = this.state;

    return (
      <div className="AddProperty">
        <div className="AddProperty-navbar">
          <div className="AddProperty__buttons">
            <h2 className="AddProperty-navbar-header">Add New Property</h2>
            <Link
              className="Properties__button Properties__button--add Link__none"
              to="/owner/properties"
            >
              Back to All Properties
            </Link>
            <button
              className="Properties__button Properties__button--logout"
              onClick={() => this.onLogout()}
            >
              Logout
            </button>
          </div>
          <img className="AddProperty__logo" src={logo} alt="logo" />
        </div>
        <form className="AddProperty-form" onSubmit={this.onSubmitHandler}>
          <label className="Property__label" htmlFor="name">
            <span className="Property__label-text">Property Name</span>
            <input
              className="AddProperty__input AddProperty__input--name"
              onChange={this.onChangeHandler}
              required
              placeholder="Name"
              name="name"
              maxLength="35"
              value={name}
              type="text"
            />
          </label>
          <label className="Property__label" htmlFor="Property address">
            <span className="Property__label-text">Property Address</span>
            <input
              className="AddProperty__input AddProperty__input--address"
              onChange={this.onChangeHandler}
              required
              placeholder="Address"
              name="address"
              value={address}
              type="text"
            />
          </label>
          <label className="Property__label" htmlFor="value">
            <span className="Property__label-text">Property Value</span>
            <input
              className="AddProperty__input AddProperty__input--value"
              onChange={this.onChangeHandler}
              required
              placeholder="Value amount"
              name="value"
              value={value}
              type="number"
            />
          </label>
          <label className="Property__label" htmlFor="photourl">
            <span className="Property__label-text">Property Photo</span>
            <input
              className="AddProperty__input AddProperty__input--photourl"
              onChange={this.onChangeHandler}
              required
              placeholder="URL address"
              name="photourl"
              maxLength="180"
              value={photourl}
              type="url"
            />
          </label>
          <label className="Property__label" htmlFor="units">
            <span className="Property__label-text">Total Number of Property Units</span>
            <input
              className="AddProperty__input AddProperty__input--units"
              onChange={this.onChangeHandler}
              required
              placeholder="Number of units"
              name="units"
              value={units}
              type="number"
            />
          </label>
          <label className="Property__label" htmlFor="expenses">
            <span className="Property__label-text">Total Property Expenses</span>
            <input
              className="AddProperty__input AddProperty__input--expenses"
              onChange={this.onChangeHandler}
              required
              placeholder="Expense amount"
              name="expenses"
              value={expenses}
              type="number"
            />
          </label>
          <button className="AddProperty__button">Add Property</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.propertyReducer,
});

export default connect(mapStateToProps, {createProperty, logoutUser})(AddProperty);
