export interface ProductInterface {
  id: number;
  quantity: number;
  cost: number;
}

export interface OrderInterface {
  clientId: number;
  date: Date;
  direction: string;
  products: ProductInterface[];
}
