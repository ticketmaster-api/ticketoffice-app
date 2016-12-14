import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import dateFormat from 'dateformat';

import CurrentEventsItem from "../../src/common/components/CurrentEventsItem";

const CURRENT_EVENTS_MOCK_JSON = require('./mocks/CurrentEvents.mock.json');
const CURRENT_EVENT = CURRENT_EVENTS_MOCK_JSON[0];

describe('Current Events Item render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <CurrentEventsItem currentEvent={CURRENT_EVENT} />
    );

    const currentEventsItemComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'currentEvents-item'
    );

    const showDateObj = new Date(CURRENT_EVENT.dates.start.dateTime);
    this.showDate = {
      date: dateFormat(showDateObj, 'dd'),
      month: dateFormat(showDateObj, 'mmm'),
      day: dateFormat(showDateObj, 'ddd')
    };

    this.currentEventsItemComponent = ReactDOM.findDOMNode(currentEventsItemComponent);

    // locating current events detail list
    this.currentEventsItemDetailList = this.currentEventsItemComponent.getElementsByClassName('currentEvents-item--detailList')[0];

    // locating current events detail date
    this.currentEventsItemDetailListDate = this.currentEventsItemDetailList.getElementsByClassName('currentEvents-item--detailList-date')[0];

    // locating current events detail name
    this.currentEventsItemDetailListName = this.currentEventsItemDetailList.getElementsByClassName('currentEvents-item--detailList-name')[0];

    // locating current events detail venue
    this.currentEventsItemDetailListVenue = this.currentEventsItemDetailList.getElementsByClassName('currentEvents-item--detailList-venue')[0];

    // locating thumbnail image
    this.currentEventsItemThumbnailImage = this.currentEventsItemDetailList.getElementsByClassName('currentEvents-item--detailList-img')[0];
  });

  it('Current Events Item component exist', function() {
    expect(this.currentEventsItemComponent).to.exist;
  });

  it('Current Events Item detail list component exist', function() {
    expect(this.currentEventsItemDetailList).to.exist;
  });

  it('Current Events Item detail date exist', function() {
    expect(this.currentEventsItemDetailListDate).to.exist;
  });

  it(`Current Events Item detail date shows correctly`, function() {
    expect(this.currentEventsItemDetailListDate.textContent).to.equal(`${this.showDate.month}${this.showDate.date}${this.showDate.day}`);
  });

  it('Current Events Item detail name exist', function() {
    expect(this.currentEventsItemDetailListName).to.exist;
  });

  it(`Current Events Item detail name equal ${CURRENT_EVENT.name}`, function() {
    expect(this.currentEventsItemDetailListName.textContent).to.equal(CURRENT_EVENT.name);
  });

  it('Current Events Item detail venue exist', function() {
    expect(this.currentEventsItemDetailListVenue).to.exist;
  });

  it(`Current Events Item detail venue equal ${CURRENT_EVENT._embedded.venues[0].name}`, function() {
    expect(this.currentEventsItemDetailListVenue.textContent).to.equal(CURRENT_EVENT._embedded.venues[0].name);
  });

  it('Current Events Item detail thumbnail image exist', function() {
    expect(this.currentEventsItemThumbnailImage).to.exist;
  });

  it(`Current Events Item detail thumbnail image src url should be ${CURRENT_EVENT.images[4].url}`, function() {
    expect(this.currentEventsItemThumbnailImage.getAttribute('src')).to.equal(CURRENT_EVENT.images[4].url);
  });
});
