import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../schemas/orders.schema';
import {
  ShippingInterface,
  ProductInterface,
} from '../interfaces/shipping.interface';

export class Product implements ProductInterface {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  quantity: number;
}

export class ShippingDto implements ShippingInterface {
  @ApiProperty()
  order: Order;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  issuedAt: Date;

  @ApiProperty()
  address: string;

  @ApiProperty({ type: () => Product })
  products: Product[];
}
