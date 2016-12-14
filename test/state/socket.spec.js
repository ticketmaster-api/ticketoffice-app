import React from 'react';
import { expect } from 'chai';

import * as SocketActions from '../../src/common/actions/socket';
import configureStore from '../../src/common/store/configureStore';

const socket = {
  on: () => {}
};

window.io = {
  connect: url => socket
};

describe('Socket State', function() {

  before('get the store', function() {
    const store = configureStore();
    this.store = store;

    this.callbackFunc = () => {};
  });

  it('initial socket state is null', function() {
    expect(this.store.getState().socket).to.equal(null);
  });

  it('make connection to obtain socket', function() {
    this.store.dispatch(SocketActions.connectSocket(this.callbackFunc));
    expect(this.store.getState().socket).to.equal(socket);
  });
});
