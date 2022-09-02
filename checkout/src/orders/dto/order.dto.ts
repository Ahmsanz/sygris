import { ApiProperty } from '@nestjs/swagger';
import {
  OrderInterface,
  ProductInterface,
} from '../interfaces/order.interface';

export class Product implements ProductInterface {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  cost: number;
}

export class OrderDto implements OrderInterface {
  @ApiProperty()
  clientId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  direction: string;

  @ApiProperty({
    type: () => [Product],
  })
  products: Product[];
}
