import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import * as CartActions from '../actions/cart';
import * as SocketActions from '../actions/socket';

function mapStateToProps(state) {
  let { cart, session, socket, orders } = state;

  return {
    cart,
    session,
    socket,
    orders
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...CartActions,
    ...SocketActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
