import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Login extends Component {
  constructor(props) {
    super(props);
    this.openWindow = this.openWindow.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  openWindow(event) {
    event.preventDefault();

    const { oauthAuthorizeUrl, saveTokens } = this.props;
    window.open(oauthAuthorizeUrl, 'OAUTH_POPUP');

    window.saveTokens = window.saveTokens || saveTokens;
  }

  disconnect(event) {
    event.preventDefault();
    console.log('disconnet');
    // const { clearTokens } = this.props;
  }

  render() {
    const { classnames, oauthTokens } = this.props;
    const classnamesProp = classnames || [];
    const loginClassNames = classNames(['login', ...classnamesProp]);

    const loginLinkElement = (<a className="loginLink" onClick={this.openWindow}>Connect with Ticketmaster</a>);
    const logoutLinkElement = (<a className="logoutLink" onClick={this.disconnect}>Disconnect to Ticketmaster</a>);
    const linkElement = (oauthTokens && oauthTokens.access_token) ? logoutLinkElement : loginLinkElement;

    return (
      <div className={loginClassNames}>
        {linkElement}
      </div>
    );
  }
}

Login.propTypes = {
  classnames: PropTypes.array,
  oauthAuthorizeUrl: PropTypes.string.isRequired,
  saveTokens: PropTypes.func.isRequired,
  oauthTokens: PropTypes.object
};

export default Login;
