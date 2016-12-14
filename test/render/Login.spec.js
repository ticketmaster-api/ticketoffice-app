import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Login from "../../src/common/components/Login";

const TEST_CLASSNAMES = ['header-block'];
const TEST_URL = 'http://localhost/some_authorize_url';

describe('Login render with tokens', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Login
        oauthTokens={{}}
        classnames={TEST_CLASSNAMES}
        oauthAuthorizeUrl={TEST_URL}
        saveTokens={new Function()} />
    );

    // locating list
    const login = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'login'
    );

    this.login = ReactDOM.findDOMNode(login);

    // locating link
    this.loginLink = this.login.getElementsByClassName('loginLink')[0];
  });

  it('login component exist', function() {
    expect(this.login).to.exist;
  });

  it('link exist', function() {
    expect(this.loginLink).to.exist;
  });
});

describe('Login render without tokens', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Login
        oauthTokens={{
          access_token: 'ACCESS_TOKEN'
        }}
        classnames={TEST_CLASSNAMES}
        oauthAuthorizeUrl={TEST_URL}
        saveTokens={new Function()} />
    );

    // locating list
    const login = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'login'
    );

    this.login = ReactDOM.findDOMNode(login);

    // locating link
    this.logoutLink = this.login.getElementsByClassName('logoutLink')[0];
  });

  it('link exist', function() {
    expect(this.logoutLink).to.exist;
  });
});
