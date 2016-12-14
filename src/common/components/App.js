import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Polling from './Polling';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    const { session, fetchCart } = this.props;
    const sessionCartId = session && session.cartId || null;
    if (sessionCartId) {
      fetchCart(sessionCartId);
    }
  }

  render() {
    const { children, showHeader, polling, oauthTokens } = this.props;
    const header = showHeader ? <Header oauthTokens={oauthTokens} /> : null;

    let pollingComponent = null;
    if (polling) {
      const { isOn: isPollingOn, message: pollingMessage } = polling;
      pollingComponent = (<Polling isOn={isPollingOn} message={pollingMessage} />);
    }

    return (
      <div className="app">
        {header}
        <div className="container content">
          {children}
        </div>
        {pollingComponent}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  session: PropTypes.object,
  fetchCart: PropTypes.func.isRequired,
  polling: PropTypes.object,
  showHeader: PropTypes.bool,
  oauthTokens: PropTypes.object
};

App.defaultProps = {
  showHeader: true
};

export default App;
