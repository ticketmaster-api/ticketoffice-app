import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import getCartId from '../util/cart';

class EventPricesItem extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.isCartEmpty = this.isCartEmpty.bind(this);
  }

  isCartEmpty() {
    const reservationsLength = _.get(this.props, 'cart.cart.attributes.reservations.length', 0);
    return reservationsLength < 1;
  }

  addToCart(eventPrice, eventOffer) {
    const { createCart, updateCart, updateCartState, updateOrdersState, socket, connectSocket } = this.props;
    const qty = parseInt(_.get(this, 'refs.qty_selector.value', 0), 10);

    if ((!(eventPrice && eventOffer)) || !qty || (qty <= 0)) return false;

    const { id, productId } = eventOffer;
    const { attributes } = eventPrice;
    const offerId = id;
    const priceAmount = attributes.value;
    const priceCode = attributes.currency;
    const cartId = getCartId(this.props);

    const cartingHandler = (socket) => {
      const productObjCreateCart = {
        'offers': [
          {
            'offer': offerId
          }
        ],
        'filters': {
          'maxPrice': {
            'amount': priceAmount,
            'code': priceCode
          },
          'minPrice': {
            'amount': priceAmount,
            'code': priceCode
          }
        },
        'qty': qty,
        'product': productId
      };
      const productObjAddCart = Object.assign({
        'op': 'add'
      }, productObjCreateCart);

      const requestBodyCreateCart = {
        'products': [productObjCreateCart]
      };
      const requestBodyAddCart = {
        'products': [productObjAddCart]
      };

      if (!cartId || this.isCartEmpty()) { // no cart ID or empty cart, create one
        createCart(requestBodyCreateCart, socket);
      } else {
        updateCart(cartId, requestBodyAddCart, socket);
      }
    };

    if (!socket) {
      connectSocket(cartingHandler, updateCartState, updateOrdersState);
    } else {
      cartingHandler(socket);
    }
  }

  render() {
    const { eventPrice, eventOffer, eventArea } = this.props;

    let description = null;
    if (_.has(eventOffer, 'description')) {
      description = (<span className="eventPrice-price-description">{eventOffer.description}</span>);
    }

    let area = null;
    if (_.has(eventArea, 'attributes.name')) {
      area = (<span className="eventPrice-price-area">{eventArea.attributes.name}</span>);
    }

    return (
      <li className="eventPrice-list-item">
        <span className="eventPrice-price">
          <span className="eventPrice-price-currency">{eventPrice.attributes.currency}</span> $<span className="eventPrice-price-value">{eventPrice.attributes.value}</span> - {description} {area}
          </span>
          <input ref="qty_selector" type="number" min="1" max="99" step="1" defaultValue="2" name="qty" pattern="\d+"/>
          <button
            disabled={!eventOffer}
            className="eventPrice--button button-aux button-aux--minor"
            onClick={() => this.addToCart(eventPrice, eventOffer)}>Find Tickets</button>
        </li>
    );
  }
}

EventPricesItem.propTypes = {
  eventPrice: PropTypes.object.isRequired,
  eventOffer: PropTypes.object,
  eventArea: PropTypes.object,
  socket: PropTypes.object,
  session: PropTypes.object,
  cart: PropTypes.object,
  createCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  updateCartState: PropTypes.func.isRequired,
  updateOrdersState: PropTypes.func.isRequired,
  connectSocket: PropTypes.func.isRequired
};

export default EventPricesItem;
