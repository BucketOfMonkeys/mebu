import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Doughnut} from 'react-chartjs';

import {getPropertyById} from '../../../../redux/ducks/propertyReducer';

class Metrics extends Component {
  componentDidMount() {
    this.props.getPropertyById(this.props.match.params.id);
  }

  render() {
    let property = <p>...loading</p>;
    if (this.props.selectedProperty && !this.props.loading) {
      const prop = this.props.selectedProperty;
      property = (
        <div>
          <p>Expenses: {prop.expenses}</p>
          <p>Value: {prop.value}</p>
          <p>Income: {prop.income}</p>
        </div>
      );
    }

    const data = [
      {
        value: this.props.selectedProperty.expenses,
        color: '#2796d6',
        highlight: '#29a0e5',
        label: 'Expenses',
      },
      {
        value: this.props.selectedProperty.income,
        color: '#292929',
        highlight: '#383737',
        label: 'Income',
      },
    ];

    return (
      <div>
        {property}
        <Doughnut
          data={data}
          options={{
            animationEasing: 'easeOutCubic',
          }}
          width="600"
          height="250"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.propertyReducer,
});

export default connect(mapStateToProps, {getPropertyById})(Metrics);
