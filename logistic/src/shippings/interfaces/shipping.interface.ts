import { OrderInterface } from '../schemas/orders.schema';

export interface ProductInterface {
  id: number;
  quantity: number;
  cost: number;
}

export interface ShippingInterface {
  order: OrderInterface;
  clientId: number;
  issuedAt: Date;
  address: string;
  products: ProductInterface[];
}
