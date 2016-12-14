import React, { Component, PropTypes } from 'react';

class EventPricesSorter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onSort, direction } = this.props;

    return (
      <div className="eventPrices-sorter">
        <label htmlFor="sortprice">Sort Price: </label>
        <select
          id="sortprice"
          className="eventPrices-sorter--price"
          onChange={e => onSort(e.target.value)}
          value={direction}>
          <option value="asc">Low to High</option>
          <option value="dsc">High to Low</option>
        </select>
      </div>
    );
  }
}

EventPricesSorter.propTypes = {
  onSort: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired
};

export default EventPricesSorter;
