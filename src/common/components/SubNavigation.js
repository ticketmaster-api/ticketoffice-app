import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SubNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { genres } = this.props;
    const subNavListItems = genres.map((genre, index) => (
        <li key={genre.id} className="subnavigation-list-item">
          <Link to={{ pathname: `/section/${genre.id}` }} className="genre-name">{genre.name}</Link>
        </li>
      )
    );
    return (
      <ul className="subnavigation-list">
        {subNavListItems}
      </ul>
    );
  }
}

SubNavigation.propTypes = {
  genres: PropTypes.array.isRequired
};

export default SubNavigation;
