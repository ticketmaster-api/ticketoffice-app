import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class Orders extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { orders } = this.props;
    const confirmationId = _.get(orders, 'confirmation.id', null);
    const emptyOrders = 'You don\'t have any orders.';
    let componentContent = (
      <div>
        <h1>{emptyOrders}</h1>
      </div>
    );

    if (confirmationId) {
      componentContent = (
        <div>
          <h1>Confirmation: <span className="orders-confirmationId">{confirmationId}</span></h1>
        </div>
      );
    }

    return (
      <div className="orders">
        {componentContent}
      </div>
    );
  }
}

Orders.propTypes = {
  orders: PropTypes.object
};

export default Orders;
