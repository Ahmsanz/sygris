import { ShippingDto } from './shipping.dto';

export class CreateShippingDto extends ShippingDto {
  constructor({ order, clientId, issuedAt, address, products }) {
    super();

    this.order = order;
    this.clientId = clientId;
    this.issuedAt = issuedAt;
    this.address = address;
    this.products = products;
  }
}
