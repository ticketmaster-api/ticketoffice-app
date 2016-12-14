import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NavigationItem from './NavigationItem';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories, classnames } = this.props;
    const classnamesProp = classnames || [];
    const navClassNames = classNames(['navigation', ...classnamesProp]);
    const navListItems = categories.map(category =>
      <NavigationItem key={category.segment.id} category={category} />
    );
    return (
      <nav className={navClassNames}>
        <ul className="navigation-list">
          {navListItems}
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  classnames: PropTypes.array
};

export default Navigation;
