import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';

import Reservations from './Reservations';
import SVG from '../util/svg';

class CartIcon extends Component {
  constructor(props) {
    super(props);
  }

  getCartedQty(cart) {
    let cartedQtyComponent = null;

    if (!_.has(cart, 'attributes.reservations[0].itemGroups[0].quantity')) {
      // not having at least 1 reservation and 1 itemGroup quantity field
      return cartedQtyComponent;
    }

    const reservationsArray = _.get(cart, 'attributes.reservations', []);
    let sum = 0;
    _.forEach(reservationsArray, (reservation) => {
      const itemGroupsQtySum = _.sumBy(reservation.itemGroups, 'quantity');
      sum += itemGroupsQtySum;
    });

    if (sum) {
      cartedQtyComponent = (
        <div className="cartIcon__cartedQty">{sum}</div>
      );
    }

    return cartedQtyComponent;
  }

  getTooltip(cart) {
    const { cart: cartData, _embedded } = cart;
    const reservations = _.get(cartData, 'attributes.reservations', null);
    let tooltip = null;

    if (reservations && _embedded) {
      const { events, offers } = _embedded;
      tooltip = (
        <div className="tooltip tooltip--top">
          <div className="tooltip__content">
            <Reservations
              reservations={reservations}
              offers={offers}
              events={events} />
          </div>
        </div>
      );
    }
    return tooltip;
  }

  render() {
    const { cart, classnames } = this.props;
    const classnamesProp = classnames || [];
    const cartIconClassNames = classNames(['cartIcon', ...classnamesProp]);

    const cartedQtyComponent = this.getCartedQty(cart.cart);
    const tooltip = this.getTooltip(cart);

    return (
      <div className={cartIconClassNames}>
        <svg style={{display: 'none'}}>
          <title>
            Ticketmaster Shopping Cart
          </title>
          <desc>
            Cart Icon
          </desc>
          <symbol id="cart">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinejoin="round">
                <g id="Icons" transform="translate(-888.000000, -146.000000)" stroke="#ffffff">
                    <g id="Group-653" transform="translate(888.000000, 146.000000)">
                        <path d="M23.502,0.5 L20.935,0.5 C20.687,0.5 20.476,0.683 20.44,0.93 L18.563,14.07 C18.528,14.318 18.317,14.5 18.068,14.5 L3.502,14.5 C2.179,14.5 2.181,12.5 3.502,12.5 L15.502,12.5 C16.823,12.5 16.824,10.5 15.502,10.5 L2.502,10.5 C1.179,10.5 1.181,8.5 2.502,8.5 L16.002,8.5 C17.323,8.5 17.324,6.5 16.002,6.5 L1.502,6.5 C0.179,6.5 0.181,4.5 1.502,4.5 L17.502,4.5" id="Stroke-1310" strokeLinecap="round"></path>
                        <path d="M7.502,18 C7.502,18.828 6.83,19.5 6.002,19.5 C5.174,19.5 4.502,18.828 4.502,18 C4.502,17.172 5.174,16.5 6.002,16.5 C6.83,16.5 7.502,17.172 7.502,18 L7.502,18 Z" id="Stroke-1311"></path>
                        <path d="M18.502,18 C18.502,18.828 17.83,19.5 17.002,19.5 C16.174,19.5 15.502,18.828 15.502,18 C15.502,17.172 16.174,16.5 17.002,16.5 C17.83,16.5 18.502,17.172 18.502,18 L18.502,18 Z" id="Stroke-1312"></path>
                    </g>
                </g>
            </g>
          </symbol>
        </svg>
        <Link to={{ pathname: '/cart' }} className="event-header__tm-link">
          <SVG className="event-header__cart" href="#cart" />
        </Link>
        {cartedQtyComponent}
        {tooltip}
      </div>
    );
  }
}

CartIcon.propTypes = {
  classnames: PropTypes.array,
  cart: PropTypes.object
};

export default CartIcon;
