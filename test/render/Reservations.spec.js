import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Reservations from "../../src/common/components/Reservations";

const CART_COMPLETE_MOCK_JSON = require('./mocks/CartComplete.mock.json');
const reservations = CART_COMPLETE_MOCK_JSON.cart.attributes.reservations;
const offers = CART_COMPLETE_MOCK_JSON._embedded.offers;
const events = CART_COMPLETE_MOCK_JSON._embedded.events;

describe('Reservations render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Reservations
        reservations={reservations}
        offers={offers}
        events={events} />
    );

    // locating reservation list
    const ReservationsList = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'cart-reservationsList'
    );

    this.ReservationsList = ReactDOM.findDOMNode(ReservationsList);

    // locating reservations list items
    this.reservationsListItems = this.ReservationsList.getElementsByClassName('cart-reservationsListItem');

    // locating details list
    this.itemDetailsList = this.reservationsListItems[0].getElementsByClassName('cart-reservationsListItem-itemDetailsList')[0];

    // locating details list items
    this.itemDetailsListItems = this.itemDetailsList.getElementsByClassName('cart-reservationsListItem-itemDetailsListItem');

    // locating details event name
    this.eventName = this.itemDetailsListItems[0].getElementsByClassName('reservations-eventName')[0];

    // locating details offer name
    this.offerName = this.itemDetailsListItems[0].getElementsByClassName('reservations-offerName')[0];

    // locating details quantity
    this.quantity = this.itemDetailsListItems[0].getElementsByClassName('reservations-quantity')[0];

    // locating details per item price
    this.perItemPrice = this.itemDetailsListItems[0].getElementsByClassName('reservations-perItemPrice')[0];

    // locating details currency
    this.currency = this.itemDetailsListItems[0].getElementsByClassName('reservations-currency')[0];

    // locating details section
    this.section = this.itemDetailsListItems[0].getElementsByClassName('reservations-section')[0];
  });

  it('list exists', function() {
    expect(this.ReservationsList).to.exist;
  });

  it(`number of reservations list items is ${reservations.length}`, function() {
    expect(this.reservationsListItems.length).to.equal(reservations.length);
  });

  it(`details list exists`, function() {
    expect(this.itemDetailsList).to.exist;
  });

  it(`number of item details list items is ${reservations[0].itemDetails.length}`, function() {
    expect(this.itemDetailsListItems.length).to.equal(reservations[0].itemDetails.length);
  });

  it(`event name is ${events.data[0].attributes.name}`, function() {
    expect(this.eventName.textContent).to.equal(events.data[0].attributes.name);
  });

  it(`offer name is ${offers.data[0].attributes.name}`, function() {
    expect(this.offerName.textContent).to.equal(offers.data[0].attributes.name);
  });

  it(`quantity is ${reservations[0].itemGroups[0].quantity}`, function() {
    expect(this.quantity.textContent).to.equal(reservations[0].itemGroups[0].quantity + '');
  });

  it(`per item price is ${reservations[0].itemGroups[0].perItemPrice}`, function() {
    expect(this.perItemPrice.textContent).to.equal(reservations[0].itemGroups[0].perItemPrice + '');
  });

  it(`currency is ${reservations[0].itemGroups[0].currency}`, function() {
    expect(this.currency.textContent).to.equal(reservations[0].itemGroups[0].currency + '');
  });

  it(`section is ${reservations[0].itemDetails[0].section}`, function() {
    expect(this.section.textContent).to.equal(reservations[0].itemDetails[0].section);
  });
});
