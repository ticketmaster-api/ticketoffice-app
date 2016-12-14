import React from 'react';
import { expect } from 'chai';

import * as EventOffersActions from '../../src/common/actions/eventOffers';
import configureStore from '../../src/common/store/configureStore';

const EVENT_OFFERS_MOCK_JSON = require('../render/mocks/EventOffers.mock.json');
const EVENT_OFFERS_PRICES = Object.assign([], EVENT_OFFERS_MOCK_JSON.prices.data);

describe('Event offers State', function() {

  before('get the store', function() {
    const store = configureStore({ eventOffers: EVENT_OFFERS_MOCK_JSON });
    this.store = store;
  });

  it('initial event offers state has ' + EVENT_OFFERS_PRICES.length + ' prices items', function() {
    expect(this.store.getState().eventOffers.prices.data.length).to.equal(EVENT_OFFERS_PRICES.length);
  });

  it('sort event offers prices state in ascending order', function() {
    this.store.dispatch(EventOffersActions.sortEventPrices(EventOffersActions.EVENT_PRICES_SORT_ASC));
    const data = this.store.getState().eventOffers.prices.data;
    for (let i = 1; i < data.length; i++) {
      const current = parseFloat(data[i].attributes.value);
      const previous = parseFloat(data[i-1].attributes.value);
      expect(current >= previous).to.be.true;
    }
  });

  it('sort event offers prices state in descending order', function() {
    this.store.dispatch(EventOffersActions.sortEventPrices(EventOffersActions.EVENT_PRICES_SORT_DSC));
    const data = this.store.getState().eventOffers.prices.data;
    for (let i = 1; i < data.length; i++) {
      const current = parseFloat(data[i].attributes.value);
      const previous = parseFloat(data[i-1].attributes.value);
      expect(current <= previous).to.be.true;
    }
  });
});
