import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class AttractionItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { attraction } = this.props;
    return (
      <li className="attractions-list-item" data-attractionId={attraction.id}>
        <Link to={{ pathname: `/artist/${attraction.id}` }} className="attractions-list-item-link">{attraction.name}</Link>
      </li>
    );
  }
}

AttractionItem.propTypes = {
  attraction: PropTypes.object.isRequired
};

export default AttractionItem;
