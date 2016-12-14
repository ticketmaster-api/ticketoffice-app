import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import DeliveriesOptions from './DeliveriesOptions';
import PaymentsOptions from './PaymentsOptions';
import Reservations from './Reservations';
import CartTotal from './CartTotal';
import getCartId from '../util/cart';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.hasDeliveryPayment = this.hasDeliveryPayment.bind(this);
    this.review = this.review.bind(this);
    this.completeOrderHandler = this.completeOrderHandler.bind(this);
  }

  back() {
    browserHistory.push('/');
  }

  review() {
    const { reviewOrder } = this.props;
    reviewOrder();
  }

  completeOrderHandler() {
    const { completeOrder, socket } = this.props;
    const cartId = getCartId(this.props);
    const completeOrderCallback = value => {
      if (_.has(value, 'data.confirmation.id')) {
        browserHistory.push('/orders');
      }
    };

    completeOrder(cartId, socket, completeOrderCallback);
  }

  componentDidMount() {
    const { fetchDeliveries } = this.props;
    const cartId = getCartId(this.props);
    if (cartId) {
      fetchDeliveries(cartId);
    }
  }

  hasDeliveryPayment() {
    const { cart } = this.props;
    const deliveries = _.get(cart, '["_embedded"].deliveries.data', []);
    const payments = _.get(cart, '["_embedded"].payments.data', []);

    // true when at least 1 delivery method and 1 payment method successfully associated with cart object
    return deliveries.length && payments.length;
  }

  render() {
    const { deliveriesOptions, selectDeliveries, session, socket, addPaymentInstrument, selectPayments, refreshToken, oauthTokens, cartReview } = this.props;
    const { deliveries } = deliveriesOptions;
    const cartId = getCartId(this.props);

    let checkoutContent = null;

    if (cartId && deliveries) {
      if (!this.hasDeliveryPayment() || !cartReview) {
        checkoutContent = (
          <div className="Checkout">
            <DeliveriesOptions
              deliveriesOptions={deliveriesOptions}
              selectDeliveries={selectDeliveries}
              cartId={cartId}
              session={session}
              socket={socket} />
            <PaymentsOptions
              addPaymentInstrument={addPaymentInstrument}
              selectPayments={selectPayments}
              refreshToken={refreshToken}
              oauthTokens={oauthTokens}
              cartId={cartId}
              session={session}
              socket={socket} />
            <div className="buttonBar">
              <button
                className="button checkout-back-btn"
                onClick={this.back}>Continue Shopping</button>
              <button
                disabled={!this.hasDeliveryPayment()}
                className="button checkout-review-btn"
                onClick={this.review}>Review Order</button>
            </div>
          </div>
        );
      } else {
        const { cart } = this.props;
        const cartattributes = _.get(cart, 'cart.attributes');
        const { reservations, totals } = cartattributes;
        const cartEmbedded = _.get(cart, '["_embedded"]');
        const { offers, events, deliveries, payments } = cartEmbedded;

        const deliveriesDescription =_.get(deliveries, 'data[0].attributes.description', null);
        const selectedDeliveries = deliveriesDescription ? (
          <div className="checkout-selectedDeliveries">
            <span>{`${deliveriesDescription.short} - ${deliveriesDescription.long}`}</span>
          </div>
        ) : (<span>N/A</span>);

        const paymentsAttributes =_.get(payments, 'data[0].attributes', null);
        const selectedPayments = paymentsAttributes? (
          <ul className="checkout-selectedPayments">
            <li>{`Card Type: ${paymentsAttributes.cardType}`}</li>
            <li>{`Card Number: ${paymentsAttributes.lastFour}`}</li>
            <li>{`Card Expiration: ${paymentsAttributes.expirationMonth}/${paymentsAttributes.expirationYear}`}</li>
          </ul>
        ) : (<span>N/A</span>);

        checkoutContent = (
          <div className="Checkout">
            <h2>Reservations</h2>
            <Reservations
              reservations={reservations}
              offers={offers}
              events={events} />
            <h2>Delivery Method</h2>
            {selectedDeliveries}
            <h2>Payment Method</h2>
            {selectedPayments}
            <h2>Total</h2>
            <CartTotal totals={totals} />
            <div className="buttonBar">
              <button
                className="button checkout-back-btn"
                onClick={this.back}>Continue Shopping</button>
              <button
                className="button complete-order-btn"
                onClick={this.completeOrderHandler}>Complete Order</button>
            </div>
          </div>
        );
      }
    }

    return checkoutContent;
  }
}

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
  cartReview: PropTypes.bool.isRequired,
  session: PropTypes.object.isRequired,
  fetchDeliveries: PropTypes.func.isRequired,
  completeOrder: PropTypes.func.isRequired,
  selectDeliveries: PropTypes.func.isRequired,
  addPaymentInstrument: PropTypes.func.isRequired,
  selectPayments: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired,
  reviewOrder: PropTypes.func.isRequired,
  deliveriesOptions: PropTypes.object,
  socket: PropTypes.object,
  oauthTokens: PropTypes.object
};

export default Checkout;
