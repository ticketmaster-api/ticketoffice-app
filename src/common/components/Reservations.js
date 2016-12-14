import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class Reservations extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reservations, offers, events } = this.props;

    const reservationItemsComponent = reservations.map((reservationItem, index) => {
      const { itemGroups, itemDetails, product: productId } = reservationItem;

      const itemDetailsListItems = itemDetails.map((itemDetail, index) => {
        const { metadata, section, row, startSeat, endSeat } = itemDetail;
        const { itemGroup } = metadata;
        const itemGroupData = itemGroups.find(itemGroupsItem => (itemGroupsItem.id === itemGroup));
        const { quantity, currency, perItemPrice, offer } = itemGroupData;
        const offerData = offers.data.find(offerItem => (offerItem.id === offer));
        const offerName = _.get(offerData, 'attributes.name', '');
        const eventData = events.data.find(eventItem => (
          eventItem.relationships.products.data.find(productData => (
            productData.id === productId
          ))
        ));
        const eventId = eventData.id;
        const eventName = _.get(eventData, 'attributes.name', '');

        return (
          <li key={index} className="cart-reservationsListItem-itemDetailsListItem">
            <Link to={{ pathname: `/event/${eventId}` }} className="reservations-eventName">{eventName}</Link>
            <br/>
            <span className="reservations-offerName">{offerName}</span> - Qty: <span className="reservations-quantity">{quantity}</span>, Price: <span className="reservations-perItemPrice">{perItemPrice}</span> <span className="reservations-currency">{currency}</span>
            <br/>
            Sec: <span className="reservations-section">{section}</span>, Row: <span className="reservations-row">{row}</span>, Seat: <span className="reservations-startSeat">{startSeat}</span> to <span className="reservations-endSeat">{endSeat}</span>
          </li>
        );
      });

      return (
        <li key={index} className="cart-reservationsListItem">
          <ul className="cart-reservationsListItem-itemDetailsList">
            {itemDetailsListItems}
          </ul>
        </li>
      );
    });

    return (
      <ul className="cart-reservationsList">
        {reservationItemsComponent}
      </ul>
    );
  }
}

Reservations.propTypes = {
  reservations: PropTypes.array.isRequired,
  offers: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired
};

export default Reservations;
