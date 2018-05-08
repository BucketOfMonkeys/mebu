import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPropertyById} from '../../../../redux/ducks/propertyReducer';

import './Property.css';

class Property extends Component {
  componentDidMount() {
    this.props.getPropertyById(this.props.match.params.id);
  }

  render() {
    let property = <p>...loading</p>;
    if (this.props.selectedProperty && !this.props.loading) {
      const prop = this.props.selectedProperty;
      property = (
        <div className="Property">
          <div className="Property__text">
            <h5 className="Property-name">{prop.name}</h5>
            <div className="Property__border__bottom" />
            <p className="Property__address">{prop.address}</p>

            <div className="Property__info">
              <div className="Property__info__section">
                <h6 className="Property__info__header">Units</h6>
                <p className="Proprty__info__number">{prop.units}</p>
              </div>

              <div className="Property__info__section">
                <h6 className="Property__info__header">Value</h6>
                <p className="Proprty__info__number">${prop.value}</p>
              </div>

              <div className="Property__info__section">
                <h6 className="Property__info__header">Expenses</h6>
                <p className="Proprty__info__number">${prop.expenses}</p>
              </div>
            </div>
          </div>

          <div className="Property__photo-container">
            <img className="Property__photo" src={prop.photourl} alt="apartment" />
          </div>
        </div>
      );
    }

    return <div className="Property-container">{property}</div>;
  }
}

const mapStateToProps = state => ({
  ...state.propertyReducer,
});

export default connect(mapStateToProps, {getPropertyById})(Property);
