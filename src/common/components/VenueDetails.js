import React, { Component, PropTypes } from 'react';
import CurrentEvents from './CurrentEvents';
import selectWidestNonFallback from '../util/selectImage';

class VenueDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(params) {
    const { fetchVenueDetails, searchCurrentEvents } = this.props;
    const { venueId } = params;
    fetchVenueDetails(params);
    if (venueId) {
      searchCurrentEvents({venueId});
    }
  }

  componentDidMount() {
    const { venueDetails, params } = this.props;
    if (!venueDetails.id) {
      this.fetchData(params);
    }
  }

  componentWillReceiveProps(nextProps) {
    const thisVenueId = this.props.params.venueId;
    const nextParams = nextProps.params;
    const nextVenueId = nextParams.venueId;
    if (nextVenueId !== thisVenueId) {
      this.fetchData(nextParams);
    }
  }

  componentWillMount() {
    const { params } = this.props;
    if (params && params.venueId) {
      this.fetchData(params);
    }
  }

  render() {
    const { venueDetails, currentEvents } = this.props;

    if (!venueDetails.id) {
      return null;
    }

    const { name, address, city, state, postalCode, country, images } = venueDetails;

    let venueImage = null;
    if (images && images.length) {
      const idealImage = selectWidestNonFallback(images);
      venueImage = (<img className="venueDetails-image" src={idealImage.url} alt={name} />);
    }

    let addressElement = null;
    if (address && address.line1) {
      addressElement = (<span className="venueDetails-address">{address.line1}</span>);
    }

    let stateElement = null;
    if (state && state.stateCode) {
      stateElement = (<span className="venueDetails-state">{state.stateCode}</span>);
    }

    let currentEventsComponent = null;
    if (currentEvents && currentEvents.length) {
      currentEventsComponent = (
        <div>
          <h2>Current Events at {name}</h2>
          <CurrentEvents currentEvents={currentEvents} />
        </div>
      );
    } else {
      currentEventsComponent = (<span>No current events...</span>);
    }

    return (
      <div className="venueDetails">
        <div className="venueDetails-list">
          <h1 className="venueDetails-name">{name}</h1>
          <p>
            {venueImage}
            {addressElement}
            {addressElement? (<br/>) : null}
            <span className="venueDetails-city">{city.name}</span>{stateElement}<span className="venueDetails-postalcode">{postalCode}</span><br></br>
            <span className="venueDetails-country">{country.name}</span>
          </p>
        </div>
        {currentEventsComponent}
    </div>
    );
  }
}

VenueDetails.propTypes = {
  venueDetails: PropTypes.object.isRequired,
  currentEvents: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  fetchVenueDetails: PropTypes.func.isRequired,
  searchCurrentEvents: PropTypes.func.isRequired
};

export default VenueDetails;
