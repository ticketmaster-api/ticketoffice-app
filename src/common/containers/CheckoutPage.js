import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkout from '../components/Checkout';
import * as CartActions from '../actions/cart';
import * as CheckoutActions from '../actions/checkout';

function mapStateToProps(state) {
  let { cart, cartReview, deliveriesOptions, session, socket, orders, oauthTokens } = state;

  return {
    cart,
    cartReview,
    deliveriesOptions,
    session,
    socket,
    orders,
    oauthTokens
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDeliveries: CheckoutActions.fetchDeliveries,
    completeOrder: CartActions.completeOrder,
    selectDeliveries: CartActions.selectDeliveries,
    addPaymentInstrument: CartActions.addPaymentInstrument,
    selectPayments: CartActions.selectPayments,
    refreshToken: CartActions.refreshToken,
    reviewOrder: CartActions.reviewOrder
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
