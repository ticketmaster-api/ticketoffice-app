import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import PresaleItem from "../../src/common/components/PresaleItem";
import getFormattedEventDate from '../../src/common/util/eventDateFormatter';

const EVENT_DETAIL_MOCK_JSON = require('./mocks/EventDetails.mock.json');

const PRESALES_SIMPLE = EVENT_DETAIL_MOCK_JSON.sales.presales[0];
const PRESALE_SIMPLE_START_STRING = getFormattedEventDate(new Date(PRESALES_SIMPLE.startDateTime)).full;
const PRESALE_SIMPLE_END_STRING = getFormattedEventDate(new Date(PRESALES_SIMPLE.endDateTime)).full;
const PRESALE_SIMPLE_DATE_STRING = `(${PRESALE_SIMPLE_START_STRING} - ${PRESALE_SIMPLE_END_STRING})`;

describe('Presale simple item render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <PresaleItem presale={PRESALES_SIMPLE} />
    );

    // locating list item
    const presaleListItem = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'presale-list-item'
    );

    this.presaleListItem = ReactDOM.findDOMNode(presaleListItem);

    // locating presale list item name
    this.presaleListItemName = this.presaleListItem.getElementsByClassName('presale-name')[0];

    // locating presale list item date
    this.presaleListItemDate = this.presaleListItem.getElementsByClassName('presale-date')[0];
  });

  it('presale item component exist', function() {
    expect(this.presaleListItem).to.exist;
  });

  it('presale item name exist', function() {
    expect(this.presaleListItemName).to.exist;
  });

  it(`presale item name should be ${PRESALES_SIMPLE.name}`, function() {
    expect(this.presaleListItemName.textContent).to.equal(PRESALES_SIMPLE.name);
  });

  it('presale item date exist', function() {
    expect(this.presaleListItemDate).to.exist;
  });

  it(`presale item date should be "${PRESALE_SIMPLE_DATE_STRING}"`, function() {
    expect(this.presaleListItemDate.textContent).to.equal(PRESALE_SIMPLE_DATE_STRING);
  });
});

const PRESALES_COMPLEX = EVENT_DETAIL_MOCK_JSON.sales.presales[1];

describe('Presale complex item render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <PresaleItem presale={PRESALES_COMPLEX} />
    );

    // locating list item
    const presaleListItem = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'presale-list-item'
    );

    this.presaleListItem = ReactDOM.findDOMNode(presaleListItem);

    // locating presale list item name
    this.presaleListItemName = this.presaleListItem.getElementsByClassName('presale-name')[0];

    // locating presale list item tooltip
    this.presaleListItemTooltip = this.presaleListItem.getElementsByClassName('tooltip')[0];

    // locating presale list item tooltip content
    this.presaleListItemTooltipContent = this.presaleListItemTooltip.getElementsByClassName('tooltip__content')[0];
  });

  it('presale item component exist', function() {
    expect(this.presaleListItem).to.exist;
  });

  it('presale item name exist', function() {
    expect(this.presaleListItemName).to.exist;
  });

  it(`presale item name should be an anchor`, function() {
    expect(this.presaleListItemName.tagName).to.equal('A');
  });

  it(`presale item name anchor has href="${PRESALES_COMPLEX.url}"`, function() {
    expect(this.presaleListItemName.getAttribute("href")).to.equal(PRESALES_COMPLEX.url);
  });

  it('presale item tooltip exist', function() {
    expect(this.presaleListItemTooltip).to.exist;
  });

  it('presale item tooltip content matches data', function() {
    expect(this.presaleListItemTooltipContent.textContent).to.equal(PRESALES_COMPLEX.description);
  });
});
