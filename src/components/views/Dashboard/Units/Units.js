import React, {Component} from 'react';
import {connect} from 'react-redux';

import NewUnit from './NewUnit/NewUnit';
import {getPropertyById} from '../../../../redux/ducks/propertyReducer';
import './Units.css';

class Units extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUnits: [],
    };
    this.onAddHandler = this.onAddHandler.bind(this);
    this.onRemoveHandler = this.onRemoveHandler.bind(this);
    this.onFromArrayDelete = this.onFromArrayDelete.bind(this);
  }
  componentDidMount() {
    this.props.getPropertyById(this.props.match.params.id);
  }

  onAddHandler() {
    const {newUnits} = this.state;
    const index = newUnits.length;
    const arrCopy = newUnits.slice();
    arrCopy.push(<NewUnit
      remove={this.onFromArrayDelete}
      key={index}
      creating
      editing
      index={index}
      unit={{
          bath: 0,
          bed: 0,
          occupied: true,
          rent: 0,
          roomnum: 0,
          size: 0,
        }}
    />);
    this.setState({newUnits: arrCopy});
  }

  onRemoveHandler() {
    if (this.state.newUnits.length > 0) {
      const arrCopy = this.state.newUnits.slice();
      arrCopy.pop();
      this.setState({newUnits: arrCopy});
    }
  }

  onFromArrayDelete(index) {
    const {newUnits} = this.state;
    if (newUnits.length >= 0) {
      const newUnitsCopy = [...newUnits];
      newUnitsCopy.splice(index, 1);
      this.setState({newUnits: newUnitsCopy});
    }
  }

  render() {
    const {selectedProperty, loading} = this.props;
    const {newUnits, savedUnits} = this.state;
    let property = <p>...loading</p>;
    if (selectedProperty && !loading) {
      property =
        selectedProperty.occupiedUnits &&
        selectedProperty.occupiedUnits.map(unit => (
          <NewUnit index={-1} creating={false} editing={false} key={unit.unitid} unit={unit} />
        ));
    }
    const newUnitDisplay =
      newUnits.length > 0 &&
      newUnits.map((newUnit, index) => (
        <NewUnit
          remove={this.onFromArrayDelete}
          key={index}
          index={index}
          creating
          editing
          unit={{
            bath: 0,
            bed: 0,
            occupied: true,
            rent: 0,
            roomnum: 0,
            size: 0,
          }}
        />
      ));
    return (
      <div className="Units container">
        <h1>Current Units</h1>
        <div className="Units__titles">
          <p>Bath</p>
          <p>Bed</p>
          <p>Occupied</p>
          <p>Rent</p>
          <p>Roomnum</p>
          <p>Size</p>
          <div>
            <button onClick={this.onAddHandler}>Add</button>
            <button onClick={this.onRemoveHandler}>Remove</button>
          </div>
        </div>
        {newUnits.length > 0 && <h1>Multi-Add</h1>}
        {newUnitDisplay}

        {property}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.propertyReducer,
});

export default connect(mapStateToProps, {getPropertyById})(Units);
