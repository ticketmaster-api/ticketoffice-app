import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import Reservations from './Reservations';
import CartTotal from './CartTotal';
import CountDownClock from './CountDownClock';
import getCartId from '../util/cart';

const CART_CLASSNAME = 'cartPage';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
    this.emptyCartHandler = this.emptyCartHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (_.has(nextProps, 'orders.confirmation.id')) {
      browserHistory.push('/orders');
    }
  }

  checkout() {
    const cartId = getCartId(this.props);

    if (cartId) {
      browserHistory.push('/checkout');
    }
  }

  emptyCartHandler() {
    const { emptyCart } = this.props;
    const cartId = getCartId(this.props);

    if (cartId) {
      emptyCart(cartId);
    }
  }

  isExpired(expiration) {
    const now = new Date();
    const expirationDate = new Date(expiration);
    return (now > expirationDate);
  }

  render() {
    // Cart can be in one of the following condition:
    // 1. cart never created (no cart.id or session.cartId)
    // 2. cart is created, contains reservation(s) and not in polling mode
    // 3. cart is created, and in polling mode but not yet has reservation(s)
    // 4. cart is created, has session.cartId but not exists in app state (missing cart.id)

    const { cart } = this.props;
    const cartId = getCartId(this.props);
    const emptyCartComponent = (
      <div className={CART_CLASSNAME}>
        <h1 className="emptyMsg">Empty cart, please add tickets.</h1>
      </div>
    );
    let cartContent = emptyCartComponent;

    if (cart && cart.polling) {
      cartContent = (
        <div className={CART_CLASSNAME}>
          <h1 className="pollingMsg">We are processing your request, sit tight!</h1>
        </div>
      );
    } else if (cartId) {
      const { cart: cartData, _embedded } = cart;
      if (cartData && cartData.attributes && _embedded) {
        const { reservations, totals } = cartData.attributes;
        const { events, offers } = _embedded;
        let countDownClock = null;
        const expiration = _.get(reservations, '[0].expiration', null);

        if (expiration) {
          if (this.isExpired(expiration)) {
            this.emptyCartHandler();
          } else {
            countDownClock = (
              <CountDownClock
                expiration={expiration}
                emptyCartHandler={this.emptyCartHandler} />);
          }
        }

        if (reservations && reservations.length) {
          cartContent = (
            <div className={CART_CLASSNAME}>
              {countDownClock}
              <h1>Shopping Cart</h1>
              <h2>Reservations</h2>
              <Reservations
                reservations={reservations}
                offers={offers}
                events={events} />
              <h2>Totals</h2>
              <CartTotal totals={totals} />
              <div className="buttonBar">
                <button
                  className="button emptyCartBtn"
                  onClick={this.emptyCartHandler}>Empty Cart</button>
                <button
                  className="button button--cta cart-checkout-btn"
                  onClick={this.checkout}>Checkout</button>
              </div>
            </div>
          );
        }
      }
    }

    return cartContent;
  }
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  emptyCart: PropTypes.func.isRequired
};

export default Cart;
