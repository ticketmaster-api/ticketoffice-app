import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import CurrentEvents from "../../src/common/components/CurrentEvents";

const CURRENT_EVENTS_MOCK_JSON = require('./mocks/CurrentEvents.mock.json');

describe('Current Events render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <CurrentEvents currentEvents={CURRENT_EVENTS_MOCK_JSON} />
    );

    const currentEventsComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'currentEvents'
    );

    this.currentEventsComponent = ReactDOM.findDOMNode(currentEventsComponent);

    // locating current events list
    this.currentEventsList = this.currentEventsComponent.getElementsByClassName('currentEvents-list')[0];

    // locating current events list items
    this.currentEventsItem = this.currentEventsList.getElementsByClassName('currentEvents-item');
  });

  it('Current Events component exist', function() {
    expect(this.currentEventsComponent).to.exist;
  });

  it('Current Events List exist', function() {
    expect(this.currentEventsList).to.exist;
  });

  it(`number of current events list items is equal to ${CURRENT_EVENTS_MOCK_JSON.length}`, function() {
    expect(this.currentEventsItem.length).to.equal(CURRENT_EVENTS_MOCK_JSON.length);
  });
});
