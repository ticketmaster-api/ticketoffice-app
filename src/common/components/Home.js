import React, { Component, PropTypes } from 'react';
import CurrentEvents from './CurrentEvents';
import geolocation from '../util/geolocation';

class Home extends Component {

  constructor(props) {
    super(props);
    this.searchCurrentEventsWithGeo = this.searchCurrentEventsWithGeo.bind(this);
    this.getCurrentPositionErrorHandler = this.getCurrentPositionErrorHandler.bind(this);
  }

  searchCurrentEventsWithGeo(pos) {
    const { latitude, longitude } = pos.coords;
    this.props.searchCurrentEvents({
      lat: latitude,
      long: longitude
    });
  }

  getCurrentPositionErrorHandler(err) {
    this.props.searchCurrentEvents();
  }

  componentDidMount() {
    const { searchCurrentEvents, lat, long } = this.props;

    if (lat && long) {
      this.searchCurrentEventsWithGeo({
        coords: {
          latitude: lat,
          longitude: long
        }
      });
    } else {
      geolocation(
        this.searchCurrentEventsWithGeo,
        this.getCurrentPositionErrorHandler,
        searchCurrentEvents
      );
    }
  }

  render() {
    const { currentEvents } = this.props;
    let currentEventsComponent = null;
    if (currentEvents.length > 0) {
      currentEventsComponent = (<CurrentEvents currentEvents={currentEvents} />);
    } else {
      currentEventsComponent = (<span>No current events...</span>);
    }
    return (
      <div className="home">
        <h1>Hot Tickets</h1>
        {currentEventsComponent}
      </div>
    );
  }
}

Home.propTypes = {
  currentEvents: PropTypes.array.isRequired,
  lat: PropTypes.number,
  long: PropTypes.number,
  searchCurrentEvents: PropTypes.func.isRequired
};

export default Home;
