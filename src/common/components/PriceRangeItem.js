import React, { Component, PropTypes } from 'react';

class PriceRangeItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { priceRange } = this.props;
    return (
      <li className="priceRange-list-item">
        <span className="priceRange-type">{priceRange.type}</span> - from <span className="priceRange-currency">{priceRange.currency}</span> $<span className="priceRange-min">{priceRange.min}</span> to <span className="priceRange-currency">{priceRange.currency}</span> $<span className="priceRange-max">{priceRange.max}</span>
      </li>
    );
  }
}

PriceRangeItem.propTypes = {
  priceRange: PropTypes.object.isRequired
};

export default PriceRangeItem;
