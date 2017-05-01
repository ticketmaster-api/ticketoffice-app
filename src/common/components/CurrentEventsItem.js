import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import getFormattedEventDate from '../util/eventDateFormatter';

const THUMBNAIL_IMAGE_HEIGHT = 70;
const THUMBNAIL_IMAGE_HEIGHT_DIFFERENCE = 100;

class CurrentsEventItem extends Component {
  constructor(props) {
    super(props);
  }

  getCloselySizedImage(imageArray, targetedHeight, threshold) {
    // Filter out fallback images
    const nonFallbackImages = imageArray.filter(element => !element.fallback);

    // Find the closely sized nonfallback image, but if all images are fallback, then just find one regardless
    let imageCandidates;
    if (nonFallbackImages.length) {
      imageCandidates = nonFallbackImages;
    } else {
      imageCandidates = imageArray;
    }

    return imageCandidates.find((element) => {
      // This is to find an image in array which its height is within threshold of targetedHeight
      return Math.abs(element.height - targetedHeight) < threshold;
    }) || null;
  }

  render() {
    const { currentEvent } = this.props;
    const firstVenue = _.get(currentEvent, '_embedded.venues[0]', null);
    //OPIT-63: fix empty dates 
    const showDate = currentEvent.dates.start.dateTime ?
      getFormattedEventDate(new Date(currentEvent.dates.start.dateTime))
      : (currentEvent.dates.start.localDate ?
      getFormattedEventDate(new Date(currentEvent.dates.start.localDate))
      : {month:"not",date:"set",day:"yet"});

    let venueComponent = null;
    if (firstVenue) {
      venueComponent = (
        <li className="currentEvents-item--venue-container">
          <Link to={{ pathname: `/venue/${firstVenue.id}` }} className="currentEvents-item--detailList-venue">
            {firstVenue.name}
          </Link>
        </li>
      );
    }

    let thumbnailImage = null;
    if (currentEvent.images && currentEvent.images.length) {
      thumbnailImage = this.getCloselySizedImage(currentEvent.images, THUMBNAIL_IMAGE_HEIGHT, THUMBNAIL_IMAGE_HEIGHT_DIFFERENCE);

      if (thumbnailImage) {
        thumbnailImage = (
          <li className="currentEvents-item--image-container">
            <img className="currentEvents-item--detailList-img" src={thumbnailImage.url} title={currentEvent.name}/>
          </li>
        );
      }
    }

    return (
      <li key={currentEvent.id} className="currentEvents-item">
        <ul className="currentEvents-item--detailList">

          <li className="currentEvents-item--date-container">
            <div className="currentEvents-item--detailList-date">
              <div className="month">{showDate.month}</div>
              <div className="date">{showDate.date}</div>
              <div className="day">{showDate.day}</div>
            </div>
          </li>

          <li className="currentEvents-item--name-container">
            <Link to={{ pathname: `/event/${currentEvent.id}` }} className="currentEvents-item--detailList-name">
              {currentEvent.name}
            </Link>
          </li>

          {venueComponent}

          {thumbnailImage}

        </ul>
      </li>
    );
  }
}

CurrentsEventItem.propTypes = {
  currentEvent: PropTypes.object.isRequired
};

export default CurrentsEventItem;
