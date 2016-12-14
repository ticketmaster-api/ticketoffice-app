import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import CurrentEvents from './CurrentEvents';
import selectWidestNonFallback from '../util/selectImage';

class AttractionDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(params) {
    const { fetchAttractionDetails, searchCurrentEvents } = this.props;
    const { attractionId } = params;
    fetchAttractionDetails(params);
    if (attractionId) {
      searchCurrentEvents({attractionId});
    }
  }

  componentDidMount() {
    const { attractionDetails, params } = this.props;
    if (!attractionDetails.id) {
      this.fetchData(params);
    }
  }

  componentWillReceiveProps(nextProps) {
    const thisAttractionId = this.props.params.attractionId;
    const nextParams = nextProps.params;
    const nextAttractionId = nextParams.attractionId;

    if (nextAttractionId !== thisAttractionId) {
      this.fetchData(nextParams);
    }
  }

  componentWillMount() {
    const { params } = this.props;
    if (params && params.attractionId) {
      this.fetchData(params);
    }
  }

  render() {
    const { attractionDetails, currentEvents } = this.props;
    const { classifications, images, name } = attractionDetails;

    let segment = null;
    if (_.has(attractionDetails, 'classifications[0].segment.name')) {
      const segmentObj = classifications[0].segment;
      segment = (<span className="attractionDetails-segment attractionDetails-classifications" data-classificationsId={segmentObj.id}>{segmentObj.name}</span>);
    }

    let genre = null;
    if (_.has(attractionDetails, 'classifications[0].genre.name')) {
      const genreObj = classifications[0].genre;
      genre = (<span className="attractionDetails-genre attractionDetails-classifications" data-classificationsId={genreObj.id}>{genreObj.name}</span>);
    }

    let subGenre = null;
    if (_.has(attractionDetails, 'classifications[0].subGenre.name')) {
      const subGenreObj = classifications[0].subGenre;
      subGenre = (<span className="attractionDetails-subGenre attractionDetails-classifications" data-classificationsId={subGenreObj.id}>{subGenreObj.name}</span>);
    }

    let img = null;
    if (images && images.length) {
      const idealImage = selectWidestNonFallback(images);
      img = (<img className="attractionDetails-img" src={idealImage.url} title={name}/>);
    }

    let currentEventsComponent = null;
    if (currentEvents && currentEvents.length) {
      currentEventsComponent = (
        <div>
          <h2>Current Events of {name}</h2>
          <CurrentEvents currentEvents={currentEvents} />
        </div>
      );
    } else {
      currentEventsComponent = (<span>No current events...</span>);
    }

    return (
      <div className="attractionDetails">
        <div className="attractionDetails-list">
          <h1 className="attractionDetails-name">{name}</h1>
          <div className="attractionDetails-classifications-list">
            {segment}{genre}{subGenre}
          </div>
          {img}
        </div>
        {currentEventsComponent}
      </div>
    );
  }
}

AttractionDetails.propTypes = {
  attractionDetails: PropTypes.object.isRequired,
  currentEvents: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  fetchAttractionDetails: PropTypes.func.isRequired,
  searchCurrentEvents: PropTypes.func.isRequired
};

export default AttractionDetails;
