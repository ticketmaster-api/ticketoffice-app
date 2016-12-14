import React, { Component, PropTypes } from 'react';

class EventOffersItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { eventOffer } = this.props;
    return (
      <li className="eventOffer-list-item">
        <ul>
          <li>Name: <span className="eventOffer-name">{eventOffer.name}</span></li>
          <li>Description: <span className="eventOffer-description">{eventOffer.description}</span></li>
          <li>RAW prices: <span className="eventOffer-prices">{JSON.stringify(eventOffer.prices)}</span></li>
        </ul>
      </li>
    );
  }
}

EventOffersItem.propTypes = {
  eventOffer: PropTypes.object.isRequired
};

export default EventOffersItem;
