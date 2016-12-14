import React, { Component, PropTypes } from 'react';

class CartTotal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { totals } = this.props;

    return (
      <ul className="cart-totals">
        <li>Price: <span className="cart-totalPrice">{totals.price}</span></li>
        <li>Fees: <span className="cart-totalFees">{totals.fees}</span></li>
        <li>Deliveries: <span className="cart-totalDeliveries">{totals.deliveries}</span></li>
        <li>Taxes: <span className="cart-totalTaxes">{totals.taxes}</span></li>
        <li>Total: <span className="cart-total">{totals.total}</span></li>
      </ul>
    );
  }
}

CartTotal.propTypes = {
  totals: PropTypes.object.isRequired
};

export default CartTotal;
