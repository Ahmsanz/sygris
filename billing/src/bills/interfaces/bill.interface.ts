import { OrderInterface } from '../schemas/orders.schema';

export interface ProductInterface {
  id: number;
  quantity: number;
  cost: number;
}

export interface BillInterface {
  order: OrderInterface;
  clientId: number;
  issuedAt: Date;
  totalCost: number;
  products: ProductInterface[];
}
