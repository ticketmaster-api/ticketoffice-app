import React, { Component, PropTypes } from 'react';
import Duration from 'duration';

class CountDownClock extends Component {
  constructor(props) {
    super(props);
    this.getDuration = this.getDuration.bind(this);

    const durationText = this.getDuration();
    this.state = {
      durationText
    };
  }

  componentDidMount() {
    this.tickingInterval = setInterval(()=>{
      this.setState({
        durationText: this.getDuration()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tickingInterval);
  }

  getDuration() {
    const { expiration, emptyCartHandler } = this.props;
    const now = new Date();
    const expirationDate = new Date(expiration);

    if (expirationDate.toString() === 'Invalid Date' || now > expirationDate) {
      clearInterval(this.tickingInterval);
      emptyCartHandler();
      return '--:--';
    }

    const duration = new Duration(now, expirationDate);
    return duration.toString('%Ms:%S');
  }

  render() {

    return (
      <div className="countDownClock">
        <div className="timer">
          <div className="is-offscreen">Time left to complete page.</div>
          <div className="timer__indicator">{this.state.durationText}</div>
          <div className="timer__spinner timer__animate"></div>
          <div className="timer__filler timer__animate"></div>
          <div className="timer__bg"></div>
          <div className="timer__mask timer__animate"></div>
        </div>
      </div>
    );
  }
}

CountDownClock.propTypes = {
  expiration: PropTypes.string.isRequired,
  emptyCartHandler: PropTypes.func.isRequired
};

export default CountDownClock;
