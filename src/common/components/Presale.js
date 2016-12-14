import React, { Component, PropTypes } from 'react';
import PresaleItem from './PresaleItem';

class Presale extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { presales } = this.props;
    const presaleListItems = presales.map((presale, index) =>
      <PresaleItem key={index} presale={presale} />
    );
    return (
      <div className="presale">
        <ul className="presale-list">
          {presaleListItems}
        </ul>
      </div>
    );
  }
}

Presale.propTypes = {
  presales: PropTypes.array.isRequired
};

export default Presale;
