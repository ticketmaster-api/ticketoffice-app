import React, { Component, PropTypes } from 'react';
import EventPrices from './EventPrices';

class EventOffers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { eventOffers, onSortEventPrices, createCart, updateCart, updateCartState, updateOrdersState, socket, session, cart, connectSocket } = this.props;
    const { prices, offers, areas } = eventOffers;

    if (!(eventOffers && prices)) {
      return null;
    }

    const direction = prices.sortDirection || 'asc';

    return (
      <div className="eventOffers">
        <h2>Current Offers:</h2>
        <EventPrices
          eventPrices={prices.data}
          eventOffers={offers}
          eventAreas={areas.data}
          onSortEventPrices={onSortEventPrices}
          createCart={createCart}
          updateCart={updateCart}
          updateCartState={updateCartState}
          updateOrdersState={updateOrdersState}
          direction={direction}
          socket={socket}
          session={session}
          cart={cart}
          connectSocket={connectSocket} />
      </div>
    );
  }
}

EventOffers.propTypes = {
  eventOffers: PropTypes.object.isRequired,
  socket: PropTypes.object,
  session: PropTypes.object,
  cart: PropTypes.object,
  onSortEventPrices: PropTypes.func.isRequired,
  createCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  updateCartState: PropTypes.func.isRequired,
  updateOrdersState: PropTypes.func.isRequired,
  connectSocket: PropTypes.func.isRequired
};

export default EventOffers;
