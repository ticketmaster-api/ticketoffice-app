import _ from 'lodash';

export function parseEventOffers(rawData) {
  const { prices, _embedded } = rawData;
  const { priceZones, areas } = _embedded;
  const offers = rawData.offers.map(eventOffer => {
    const { id, attributes, relationships } = eventOffer;
    const productId = _.get(relationships, 'products.data[0].id', null);
    const prices = attributes.prices.map(price => {
      const matchedPriceZone = priceZones.data.find(priceZone => priceZone.id === price.priceZone);
      const { currency, name } = matchedPriceZone.attributes;
      const fees = price.fees.map(fee => ({
        label: fee.label,
        value: fee.value
      }));
      const taxes = price.taxes.map(fee => ({
        label: fee.label,
        value: fee.value
      }));
      return {
        currency,
        name,
        value: price.value,
        total: price.total,
        fees,
        taxes
      };
    });

    return {
      id,
      name: attributes.name,
      description: attributes.description,
      productId,
      prices
    };
  });

  return { prices, priceZones, areas, offers };
}
