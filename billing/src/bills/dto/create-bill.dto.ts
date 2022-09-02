import { BillDto } from './bill.dto';

export class CreateBillDto extends BillDto {
  constructor({ order, clientId, issuedAt, totalCost, products }) {
    super();

    this.order = order;
    this.clientId = clientId;
    this.issuedAt = issuedAt;
    this.totalCost = totalCost;
    this.products = products;
  }
}
