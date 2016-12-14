import _ from 'lodash';

const getCartId = (props) => {
  const { cart, session } = props;
  const source = cart || session || null;
  return _.get(source, 'cart.id', null);
};

export default getCartId;
