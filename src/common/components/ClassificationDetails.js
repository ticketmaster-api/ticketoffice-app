import React, { Component, PropTypes } from 'react';
import CurrentEvents from './CurrentEvents';
import geolocation from '../util/geolocation';

class ClassificationDetails extends Component {
  constructor(props) {
    super(props);
    this.searchCurrentEventsWithGeo = this.searchCurrentEventsWithGeo.bind(this);
    this.getCurrentPositionErrorHandler = this.getCurrentPositionErrorHandler.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  searchCurrentEventsWithGeo(pos, classificationId) {
    const { latitude: lat, longitude: long } = pos.coords;
    this.props.searchCurrentEvents({
      lat,
      long,
      classificationId
    });
  }

  getCurrentPositionErrorHandler(err, classificationId) {
    this.props.searchCurrentEvents({classificationId});
  }

  fetchData(props) {
    const { searchCurrentEvents, fetchClassificationDetails, params, lat: latitude, long: longitude } = props;
    const { classificationId } = params;

    fetchClassificationDetails(params);

    if (latitude && longitude) {
      this.searchCurrentEventsWithGeo({
        coords: {
          latitude,
          longitude
        }
      }, classificationId);
    } else {
      geolocation(
        (pos) => {
          this.searchCurrentEventsWithGeo(pos, classificationId);
        },
        (err) => {
          this.getCurrentPositionErrorHandler(err, classificationId);
        },
        searchCurrentEvents
      );
    }
  }

  componentDidMount() {
    if (this.props.params.classificationId) {
      this.fetchData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextClassificationId = nextProps.params && nextProps.params.classificationId;
    if (nextClassificationId && (nextClassificationId != this.props.params.classificationId)) {
      this.fetchData(nextProps);
    }
  }

  render() {
    const { currentEvents, classificationDetails } = this.props;
    let currentEventsComponent = null;
    let classificationTitle = classificationDetails.classificationName? `Current Events for ${classificationDetails.classificationName}` : 'Current Events';
    if (currentEvents.length > 0) {
      currentEventsComponent = (<CurrentEvents currentEvents={currentEvents} />);
    } else {
      currentEventsComponent = (<span>No current events...</span>);
    }
    return (
      <div className="classificationDetails">
        <h1 className="classificationDetails-heading">{classificationTitle}</h1>
        {currentEventsComponent}
      </div>
    );
  }
}

ClassificationDetails.propTypes = {
  currentEvents: PropTypes.array.isRequired,
  classificationDetails: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  lat: PropTypes.number,
  long: PropTypes.number,
  searchCurrentEvents: PropTypes.func.isRequired
};

export default ClassificationDetails;
