import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  getPropertyById,
  updatePropertyById,
  archivePropertyById,
} from '../../../../redux/ducks/propertyReducer';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      photourl: '',
      address: '',
      units: 0,
      value: 0,
      expenses: 0,
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeUnits = this.handleChangeUnits.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeExpenses = this.handleChangeExpenses.bind(this);
    this.onArchiveClickHandler = this.onArchiveClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.getPropertyById(this.props.match.params.id);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.updatePropertyById(this.props.match.params.id, {
      name: this.state.name,
      photourl: this.state.photourl,
      address: this.state.address,
      units: this.state.units,
      value: this.state.value,
      expenses: this.state.expenses,
    });
  }

  onArchiveClickHandler() {
    this.props.archivePropertyById(this.props.match.params.id);
    this.props.history.push('/owner/properties');
  }

  handleChangeName(value) {
    this.setState({name: value});
  }

  handleChangePhotoUrl(value) {
    this.setState({photourl: value});
  }

  handleChangeAddress(value) {
    this.setState({address: value});
  }

  handleChangeUnits(value) {
    this.setState({units: value});
  }

  handleChangeValue(value) {
    this.setState({value});
  }

  handleChangeExpenses(value) {
    this.setState({expenses: value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <label>Property Name: </label>
          <input
            className=""
            type="text"
            value={this.state.name}
            placeholder="Property Name"
            onChange={e => this.handleChangeName(e.target.value)}
          />
          <label>Photo URL: </label>
          <input
            className=""
            type="text"
            value={this.state.photourl}
            placeholder="Photo URL"
            onChange={e => this.handleChangePhotoUrl(e.target.value)}
          />
          <label>Address: </label>
          <input
            className=""
            type="text"
            value={this.state.address}
            placeholder="Address"
            onChange={e => this.handleChangeAddress(e.target.value)}
          />
          <label>Number of Units: </label>
          <input
            className=""
            type="number"
            value={this.state.units}
            placeholder="Number of Units"
            onChange={e => this.handleChangeUnits(e.target.value)}
          />
          <label>Value: </label>
          <input
            className=""
            type="number"
            value={this.state.value}
            placeholder="Value"
            onChange={e => this.handleChangeValue(e.target.value)}
          />
          <label>Expenses: </label>
          <input
            className=""
            type="number"
            value={this.state.expenses}
            placeholder="Expenses"
            onChange={e => this.handleChangeExpenses(e.target.value)}
          />
          <input value="Update" type="submit" className="" />
        </form>
        <div>
          <button onClick={this.onArchiveClickHandler}>Archive this property</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.propertyReducer,
});

export default connect(mapStateToProps, {getPropertyById, updatePropertyById, archivePropertyById})(Settings);
