import { expect } from 'chai';

import * as EventOffersParser from "../../src/common/reducers/parsers/eventOffers";

const EVENT_OFFERS_RAW_MOCK_JSON = require('./mocks/EventOffersRaw.mock.json');
const EVENT_OFFERS_MOCK_JSON = require('../render/mocks/EventOffers.mock.json');

describe('Event offers parser', function() {

  before('parsing raw data', function() {
    this.parsedData = EventOffersParser.parseEventOffers(EVENT_OFFERS_RAW_MOCK_JSON);
  });

  it('parsed data should matched', function() {
    expect(this.parsedData).to.deep.equal(EVENT_OFFERS_MOCK_JSON);
  });
});
