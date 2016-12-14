import React, { Component, PropTypes } from 'react';
import PriceRangeItem from './PriceRangeItem';

class PriceRanges extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { priceRanges } = this.props;
    const priceRangesListItems = priceRanges.map((priceRange, index) =>
      <PriceRangeItem key={index} priceRange={priceRange} />
    );
    return (
      <div className="priceRanges">
        <span className="label">Price range</span>
        <ul className="priceRanges-list">
          {priceRangesListItems}
        </ul>
      </div>
    );
  }
}

PriceRanges.propTypes = {
  priceRanges: PropTypes.array.isRequired
};

export default PriceRanges;
