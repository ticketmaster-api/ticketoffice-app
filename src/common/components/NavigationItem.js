import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SubNavigation from './SubNavigation';

const EXCLUDED_CATEGORIES = ['undefined'];

class NavigationItem extends Component {
  constructor(props) {
    super(props);
  }

  isExcluded(name) {
    let lowerCase = name.toLowerCase();
    return lowerCase.indexOf(EXCLUDED_CATEGORIES) >= 0;
  }

  render() {
    const { category } = this.props;
    const segment = category.segment;

    if (this.isExcluded(segment.name)) {
      return null;
    }

    return (
      <li className="navigation-list-item sg__sm-font-size-responsive">
        <Link to={{ pathname: `/section/${segment.id}` }} className="segment-name">{segment.name}</Link>
        <SubNavigation genres={segment._embedded.genres} />
      </li>
    );
  }
}

NavigationItem.propTypes = {
  category: PropTypes.object.isRequired
};

export default NavigationItem;
