import React, { Component, PropTypes } from 'react';
import serialize from 'form-serialize';
import _ from 'lodash';

const CARD_TYPE = 'card-type';
const CARD_NUMBER = 'card-number';
const CARD_SECURITY_CODE = 'card-security-code';
const CARD_EXPIRATION_MONTH = 'card-expiration-month';
const CARD_EXPIRATION_YEAR = 'card-expiration-year';
const FIRSTNAME = 'first-name';
const LASTNAME = 'last-name';
const ADDRESS1 = 'address1';
const ADDRESS2 = 'address2';
const CITY = 'city';
const STATE = 'state';
const COUNTRY = 'country';
const POSTAL = 'postal';
const HOME_PHONE = 'home-phone';
const MOBILE_PHONE = 'mobile-phone';
const WORK_PHONE = 'work-phone';
const EMAIL = 'email';

class PaymentsOptions extends Component {
  constructor(props) {
    super(props);
    this.submitPaymentForm = this.submitPaymentForm.bind(this);
  }

  getCardNumbers(cardNumberString) {
    if (cardNumberString) {
      const cardNumber = parseInt(cardNumberString, 10);
      return {
        // last 4 as string
        last4: cardNumberString.substring(cardNumberString.length - 4),
        // first 6 as string
        bin: cardNumberString.substring(0, 6),
        // whole data as number
        account_number: cardNumber
      };
    }

    return null;
  }

  submitPaymentForm(event) {
    event.preventDefault();
    const { addPaymentInstrument, selectPayments, refreshToken, oauthTokens, cartId, socket } = this.props;
    const form = event.target;
    const serializedForm = serialize(form, { hash: true });

    const isCurrent = (date, bufferInSeconds = 60) => {
      const now = new Date();
      return (date - now) > (bufferInSeconds * 1000);
    };

    if (oauthTokens) {
      const { access_token, refresh_token, expiration } = oauthTokens;

      if (access_token) {
        const cardNumbers = this.getCardNumbers(_.get(serializedForm, CARD_NUMBER));

        if (!cardNumbers) {
          return false;
        }

        const cvv = _.get(serializedForm, CARD_SECURITY_CODE, '');
        const payload = {
          'flow_attributes':{
            'channel':'internal.ecommerce.consumer.desktop.distributed-web.browser.universe.com'
          },
          'funding_source':'creditcard',
          'funding_source_details':{
            'funding_method': _.get(serializedForm, CARD_TYPE, ''),
            'last4': cardNumbers.last4,
            'bin': cardNumbers.bin,
            'account_number': cardNumbers.account_number,
            'security_code': cvv,
            'expiration_month': parseInt(_.get(serializedForm, CARD_EXPIRATION_MONTH, ''), 10),
            'expiration_year': parseInt(_.get(serializedForm, CARD_EXPIRATION_YEAR, ''), 10),
            'billing_address':{
              'first_name': _.get(serializedForm, FIRSTNAME, ''),
              'last_name': _.get(serializedForm, LASTNAME, ''),
              'address_line1': _.get(serializedForm, ADDRESS1, ''),
              'address_line2': _.get(serializedForm, ADDRESS2, ''),
              'city': _.get(serializedForm, CITY, ''),
              'state': _.get(serializedForm, STATE, ''),
              'country': _.get(serializedForm, COUNTRY, ''),
              'postal_code': _.get(serializedForm, POSTAL, ''),
              'home_phone': _.get(serializedForm, HOME_PHONE, ''),
              'mobile_phone': _.get(serializedForm, MOBILE_PHONE, ''),
              'work_phone': _.get(serializedForm, WORK_PHONE, ''),
              'email': _.get(serializedForm, EMAIL, '')
            }
          }
        };

        const addPaymentInstrumentCallback = value => {
          // Hard coding token value for demo purpose
          const TOKEN_DEFAULT = 'wallet-wallet-3e9827ae98994ab18801f290f55f09cc';
          const token = _.get(value, 'data.token', TOKEN_DEFAULT);

          if (token) {
            selectPayments(cartId, {
              'payments': [{
                'op': 'add',
                'type': 'wallet',
                'token': token,
                'cvv': cvv
              }]
            }, socket);
          }
        };

        const refreshTokenCallback = value => {
          const access_token = _.get(value, 'data.access_token', null);
          if (access_token) {
            addPaymentInstrument(access_token, payload, addPaymentInstrumentCallback);
          }
        };

        // token is still valid
        if (isCurrent(expiration)) {
          addPaymentInstrument(access_token, payload, addPaymentInstrumentCallback);
        } else {
          refreshToken(refresh_token, refreshTokenCallback);
        }
      } else {
        alert('Please connect to Ticketmaster first');
      }
    }
  }

  render() {
    const now = new Date();
    const minYear = now.getFullYear();
    const maxYear = minYear + 10;

    return (
      <div className="paymentsOptions">
        <h2>Payment Options</h2>
        <form className="paymentsOptions-form" onSubmit={this.submitPaymentForm}>
          <fieldset>
            <legend>New Card Info:</legend>
            <label htmlFor={CARD_TYPE}>Type</label><input id={CARD_TYPE} name={CARD_TYPE} type="text" /><br/>
            <label htmlFor={CARD_NUMBER}>Number</label><input id={CARD_NUMBER} name={CARD_NUMBER} type="text" pattern="[0-9]{13,16}" required/><br/>
            <label htmlFor={CARD_SECURITY_CODE}>Security Code</label><input id={CARD_SECURITY_CODE} name={CARD_SECURITY_CODE} type="text" pattern="[0-9]{3,4}" required /><br/>
            <label htmlFor={CARD_EXPIRATION_MONTH}>Expiration Month</label><input id={CARD_EXPIRATION_MONTH} name={CARD_EXPIRATION_MONTH} type="number" min="1" max="12" required /><br/>
            <label htmlFor={CARD_EXPIRATION_YEAR}>Expiration Year</label><input id={CARD_EXPIRATION_YEAR} name={CARD_EXPIRATION_YEAR} type="number" min={minYear} max={maxYear} required />
          </fieldset>
          <fieldset>
            <legend>Billing Address:</legend>
            <label htmlFor={FIRSTNAME}>First Name</label><input id={FIRSTNAME} name={FIRSTNAME} type="text" required /><br/>
            <label htmlFor={LASTNAME}>Last Name</label><input id={LASTNAME} name={LASTNAME} type="text" required /><br/>
            <label htmlFor={ADDRESS1}>Address Line 1</label><input id={ADDRESS1} name={ADDRESS1} type="text" required /><br/>
            <label htmlFor={ADDRESS2}>Address Line 2</label><input id={ADDRESS2} name={ADDRESS2} type="text" /><br/>
            <label htmlFor={CITY}>City</label><input id={CITY} name={CITY} type="text" required /><br/>
            <label htmlFor={STATE}>State</label><input id={STATE} name={STATE} type="text" required /><br/>
            <label htmlFor={COUNTRY}>Country</label><input id={COUNTRY} name={COUNTRY} type="text" required /><br/>
            <label htmlFor={POSTAL}>Postal Code</label><input id={POSTAL} name={POSTAL} type="text" /><br/>
            <label htmlFor={HOME_PHONE}>Home Phone</label><input id={HOME_PHONE} name={HOME_PHONE} type="tel" /><br/>
            <label htmlFor={MOBILE_PHONE}>Mobile Phone</label><input id={MOBILE_PHONE} name={MOBILE_PHONE} type="tel" /><br/>
            <label htmlFor={WORK_PHONE}>Work Phone</label><input id={WORK_PHONE} name={WORK_PHONE} type="tel" /><br/>
            <label htmlFor={EMAIL}>Email</label><input id={EMAIL} name={EMAIL} type={EMAIL} />
          </fieldset>
          <button
            type="submit"
            className="button button-aux button-aux--minor paymentsOptions-button">Select Payment</button>
        </form>
      </div>
    );
  }
}

PaymentsOptions.propTypes = {
  cartId: PropTypes.string.isRequired,
  socket: PropTypes.object,
  addPaymentInstrument: PropTypes.func.isRequired,
  selectPayments: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired,
  oauthTokens: PropTypes.object
};

export default PaymentsOptions;
