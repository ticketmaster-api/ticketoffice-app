import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CartIcon from '../components/CartIcon';
import * as CartActions from '../actions/cart';

function mapStateToProps(state) {
  let { cart } = state;

  return {
    cart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
