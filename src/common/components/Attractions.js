import React, { Component, PropTypes } from 'react';
import AttractionItem from './AttractionItem';

class Attractions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { attractions } = this.props;
    return (
      <div className="attractions">
        <ul className="attractions-list">
          {attractions.map((attraction) =>
            <AttractionItem key={attraction.id} attraction={attraction} />
          )}
        </ul>
      </div>
    );
  }
}

Attractions.propTypes = {
  attractions: PropTypes.array.isRequired
};

export default Attractions;
