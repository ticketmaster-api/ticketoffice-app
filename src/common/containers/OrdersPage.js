import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Orders from '../components/Orders';

function mapStateToProps(state) {
  let { orders } = state;

  return {
    orders
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
