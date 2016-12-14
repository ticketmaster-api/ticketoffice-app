import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import sinon, { stub, assert } from 'sinon';

import PaymentsOptions from "../../src/common/components/PaymentsOptions";

const CART_COMPLETE_MOCK_JSON = require('./mocks/CartComplete.mock.json');
const OAUTH_TOKENS_MOCK_JSON = require('./mocks/TM.OauthTokens.mock.json');

const secondsFromNow = seconds => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + parseInt(seconds, 10));
  return now;
};

OAUTH_TOKENS_MOCK_JSON.expiration = secondsFromNow(OAUTH_TOKENS_MOCK_JSON.expires_in);

describe('Payments Options render', function() {

  before('render and locate element', function() {
    this.addPaymentInstrument = (access_token, payload, callback) => {};
    sinon.stub(this, 'addPaymentInstrument');

    this.selectPayments = (cartId, payload, socket) => {};
    sinon.stub(this, 'selectPayments');

    this.refreshToken = (refresh_token, callback) => {};
    sinon.stub(this, 'refreshToken');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <PaymentsOptions
        cartId={CART_COMPLETE_MOCK_JSON.cart.id}
        socket={{}}
        addPaymentInstrument={this.addPaymentInstrument}
        selectPayments={this.selectPayments}
        refreshToken={this.refreshToken}
        oauthTokens={OAUTH_TOKENS_MOCK_JSON} />
    );

    // locating payment options component
    const paymentsOptionsComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'paymentsOptions'
    );

    this.paymentsOptionsComponent = ReactDOM.findDOMNode(paymentsOptionsComponent);

    // locating form
    this.form = this.paymentsOptionsComponent.getElementsByClassName('paymentsOptions-form')[0];

    // locating submit button
    this.submitBtn = this.form.getElementsByClassName('paymentsOptions-button')[0];

    // locating link
    // this.loginLink = this.login.getElementsByClassName('loginLink')[0];
  });

  it('payments options component exist', function() {
    expect(this.paymentsOptionsComponent).to.exist;
  });

  it('form exist', function() {
    expect(this.form).to.exist;
  });

  it('submitBtn exist', function() {
    expect(this.submitBtn).to.exist;
  });

  it('clicking select payment button should trigger actions', function() {
    this.form.elements['card-number'].value = '4111111111111111';
    ReactTestUtils.Simulate.submit(this.form);
    assert.called(this.addPaymentInstrument);
  });
});
