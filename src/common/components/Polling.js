import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import SVG from '../util/svg';

class Polling extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOn, classnames } = this.props;
    const classnamesProp = classnames || [];
    const pollingIconClassNames = classNames(['pollingIcon', { 'pollingIconOn': isOn }, ...classnamesProp]);

    return (
      <div className={pollingIconClassNames}>
        <svg style={{display: 'none'}}>
          <title>
              Polling Checkmark
          </title>
          <desc>
              A polling checkmark.
          </desc>
          <symbol xmlns="http://www.w3.org/2000/svg" id="icon-polling-checkmark" viewBox="0 0 60 60">
            <path d="M26.712 46.29L12.435 31.98l6.181-6.215 8.085 8.14 17.112-17.138 6.191 6.199L26.712 46.29z"/>
          </symbol>
        </svg>
        <div className="polling-checkmark">
          <div className="polling-checkmark__left"></div>
          <div className="polling-checkmark__right"></div>
          <div className="polling-checkmark__icon">
            <SVG className="icon-polling-checkmark" href="#icon-polling-checkmark" />
          </div>
        </div>
      </div>
    );
  }
}

Polling.propTypes = {
  isOn: PropTypes.bool.isRequired,
  message: PropTypes.string,
  classnames: PropTypes.array
};

export default Polling;
