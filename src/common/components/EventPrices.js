import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import EventPricesSorter from './EventPricesSorter';
import EventPricesItem from './EventPricesItem';

class EventPrices extends Component {
  constructor(props) {
    super(props);
    this.sortEventPrices = this.sortEventPrices.bind(this);
  }

  sortEventPrices(value) {
    this.props.onSortEventPrices(value);
  }

  componentWillMount() {
    this.sortEventPrices(this.props.direction);
  }

  render() {
    const { eventPrices, eventOffers, eventAreas, createCart, updateCart, updateCartState, updateOrdersState, direction, socket, session, cart, connectSocket } = this.props;

    const eventPricesItems = eventPrices.map((eventPrice, index) => {
      let eventOffer = null;
      const eventPriceOfferId = _.get(eventPrice, 'relationships.offers.data[0].id', null);
      if (eventPriceOfferId) {
        eventOffer = eventOffers.find(offer => offer.id === eventPriceOfferId);
      }

      let eventArea = null;
      const eventPriceAreaId = _.get(eventPrice, 'relationships.areas.data[0].id', null);
      if (eventPriceAreaId) {
        eventArea = eventAreas.find(area => area.id === eventPriceAreaId);
      }

      return (<EventPricesItem
        key={index}
        eventPrice={eventPrice}
        eventOffer={eventOffer}
        eventArea={eventArea}
        createCart={createCart}
        updateCart={updateCart}
        updateCartState={updateCartState}
        updateOrdersState={updateOrdersState}
        socket={socket}
        session={session}
        cart={cart}
        connectSocket={connectSocket} />);
    });

    return (
      <div className="eventPrices">
        <EventPricesSorter onSort={this.sortEventPrices} direction={direction}/>
        <ul className="eventPrices-list simple-list">
          {eventPricesItems}
        </ul>
      </div>
    );
  }
}

EventPrices.propTypes = {
  eventPrices: PropTypes.array.isRequired,
  eventOffers: PropTypes.array.isRequired,
  eventAreas: PropTypes.array.isRequired,
  socket: PropTypes.object,
  session: PropTypes.object,
  cart: PropTypes.object,
  onSortEventPrices: PropTypes.func.isRequired,
  createCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  updateCartState: PropTypes.func.isRequired,
  updateOrdersState: PropTypes.func.isRequired,
  connectSocket: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired
};

export default EventPrices;
