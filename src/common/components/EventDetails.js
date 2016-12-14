import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import getFormattedEventDate from '../util/eventDateFormatter';
import selectWidestNonFallback from '../util/selectImage';
import PriceRanges from './PriceRanges';
import EventOffers from './EventOffers';
import Attractions from './Attractions';
import Presale from './Presale';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(params) {
    const { fetchEventDetails, fetchEventOffers, sortEventPrices } = this.props;
    fetchEventDetails(params);
    fetchEventOffers(params);
    sortEventPrices();
  }

  componentWillReceiveProps(nextProps) {
    const thisEventId = this.props.params.eventId;
    const nextParams = nextProps.params;
    const nextEventId = nextParams.eventId;
    if (nextEventId !== thisEventId) {
      this.fetchData(nextParams);
    }
  }

  componentWillMount() {
    const { params } = this.props;
    if (params && params.eventId) {
      this.fetchData(params);
    }
  }

  render() {
    const { eventDetails, eventOffers, sortEventPrices, createCart, updateCart, updateCartState, updateOrdersState, socket, session, cart, connectSocket } = this.props;

    // No ID, no business
    if (!eventDetails.id) {
      return null;
    }

    const { attractions, venues } = eventDetails._embedded;

    /********************* Venue starts /*********************/
    let venue = null;
    if (venues && venues.length) {
      const { id, name, city, state } = venues[0];
      if (id && name) {
        venue = (
          <li className="eventDetails-list-item">
            <span className="eventDetails-venue">
              <Link to={{ pathname: `/venue/${id}` }}>{name}</Link>, {city.name} {state.stateCode}
            </span>
          </li>
        );
      }
    }
    /********************* Venue ends /*********************/

    /********************* Details (list of attractions) starts /*********************/
    let details = null;
    if (attractions && attractions.length) {
      details = (<li className="eventDetails-list-item"><span className="label">Details</span><Attractions attractions={attractions} /></li>);
    }
    /********************* Details ends /*********************/

    /********************* Info starts /*********************/
    let info = null;
    if (eventDetails.info) {
      info = (<li className="eventDetails-list-item"><p><span className="label">Please note</span><span className="eventDetails-info">{eventDetails.info}</span></p></li>);
    }
    /********************* Info end /*********************/

    /********************* Image starts /*********************/
    const detailImage = selectWidestNonFallback(eventDetails.images);
    let img = null;
    if (detailImage && detailImage.url) {
      img = (<li className="eventDetails-list-item"><img className="eventDetails-img" src={detailImage.url} title={eventDetails.name}/></li>);
    }
    /********************* Image ends /*********************/

    /********************* Presale starts /*********************/
    let presales = null;
    const presalesArray = _.get(eventDetails, 'sales.presales', []);
    if (presalesArray && presalesArray.length) {
      presales = (<li className="eventDetails-list-item"><span className="label">Presale</span><Presale presales={presalesArray} /></li>);
    }
    /********************* Presale ends /*********************/

    /********************* Show date starts /*********************/
    let showDateComponent = null;
    if (_.has(eventDetails, 'dates.start.dateTime')) {
      const showDate = getFormattedEventDate(new Date(eventDetails.dates.start.dateTime));
      showDateComponent = (<li className="eventDetails-list-item"><h2 className="eventDetails-eventStartDateTime">{showDate.full}</h2></li>);
    }
    /********************* Show date ends /*********************/

    /********************* On sale date starts /*********************/
    let onSaleDateComponent = null;
    if (_.has(eventDetails, 'sales.public.startDateTime')) {
      const onSaleDate = getFormattedEventDate(new Date(eventDetails.sales.public.startDateTime));
      onSaleDateComponent = (<li className="eventDetails-list-item"><span className="label">On Sale</span><span className="eventDetails-onSaleStartDateTime">{onSaleDate.full}</span></li>);
    }
    /********************* On sale date ends /*********************/

    /********************* Price range starts /*********************/
    let priceRangesComponent = null;
    if (eventDetails.priceRanges) {
      priceRangesComponent = (<li className="eventDetails-list-item"><PriceRanges priceRanges={eventDetails.priceRanges}/></li>);
    }
    /********************* Price range ends /*********************/

    /********************* Offers starts /*********************/
    let eventOffersComponent = null;
    if (eventOffers && eventOffers.offers) {
      eventOffersComponent = (<EventOffers
        eventOffers={eventOffers}
        onSortEventPrices={sortEventPrices}
        createCart={createCart}
        updateCart={updateCart}
        updateCartState={updateCartState}
        updateOrdersState={updateOrdersState}
        socket={socket}
        session={session}
        cart={cart}
        connectSocket={connectSocket} />);
    }
    /********************* Offers ends /*********************/

    return (
      <div className="eventDetails" data-eventId={eventDetails.id}>
        <ul className="eventDetails-list">
          <li className="eventDetails-list-item"><h1 className="eventDetails-name">{eventDetails.name}</h1></li>
          {showDateComponent}
          {venue}
          {details}
          {info}
          {img}
          {presales}
          {onSaleDateComponent}
          {priceRangesComponent}
        </ul>
        {eventOffersComponent}
      </div>
    );
  }
}

EventDetails.propTypes = {
  eventDetails: PropTypes.object.isRequired,
  eventOffers: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  socket: PropTypes.object,
  session: PropTypes.object,
  cart: PropTypes.object,
  fetchEventDetails: PropTypes.func.isRequired,
  fetchEventOffers: PropTypes.func.isRequired,
  sortEventPrices: PropTypes.func.isRequired,
  createCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  updateCartState: PropTypes.func.isRequired,
  updateOrdersState: PropTypes.func.isRequired,
  connectSocket: PropTypes.func.isRequired
};

export default EventDetails;
