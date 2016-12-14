import React, { Component, PropTypes } from 'react';
import serialize from 'form-serialize';
import _ from 'lodash';

const DELIVERY_ID_NAME = 'deliveryId';

class DeliveriesOptions extends Component {
  constructor(props) {
    super(props);
    this.submitDeliveryForm = this.submitDeliveryForm.bind(this);
  }

  submitDeliveryForm(event) {
    event.preventDefault();
    const { selectDeliveries, cartId, socket } = this.props;
    const form = event.target;
    const serializedForm = serialize(form, { hash: true });
    const deliveryId = _.get(serializedForm, DELIVERY_ID_NAME, null);

    if (deliveryId) {
      selectDeliveries(cartId, {
        deliveries: [{deliveryId}]
      }, socket);
    }
  }

  render() {
    const deliveries = _.get(this.props, 'deliveriesOptions.deliveries', []);
    const deliveriesOptionsItems = deliveries.map((delivery, index) => {
      const { id, attributes } = delivery;
      const { totals, description } = attributes;
      const { grand, currency } = totals;
      const { long, short } = description;
      const inputId = `delivery_${index}`;
      return (
        <li key={id} className="deliveriesOptions-item radio-list__item radio">
          <input id={inputId} type="radio" className="radio__input" name={DELIVERY_ID_NAME} value={id} required defaultChecked={index == 0}/>
          <label htmlFor={inputId} className="radio__label"><span className="deliveriesOptions-item__shortDesc">{short}</span> - <span className="deliveriesOptions-item__grand">{`$${grand} ${currency}`}</span></label>
          <div className="tooltip tooltip--top">
            <div className="tooltip__content deliveriesOptions-item__longDesc">
              {long}
            </div>
          </div>
        </li>
      );
    });
    return (
      <div className="deliveriesOptions">
        <h2>Delivery Options</h2>
        <form className="deliveriesOptions-form" onSubmit={this.submitDeliveryForm}>
          <ul className="deliveriesOptions-list radio-list">
            {deliveriesOptionsItems}
          </ul>
          <button
            type="submit"
            className="button button-aux button-aux--minor deliveriesOptions-button">Select Delivery</button>
        </form>
      </div>
    );
  }
}

DeliveriesOptions.propTypes = {
  deliveriesOptions: PropTypes.object.isRequired,
  selectDeliveries: PropTypes.func.isRequired,
  cartId: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
  socket: PropTypes.object
};

export default DeliveriesOptions;
