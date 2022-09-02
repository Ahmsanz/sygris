import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../schemas/orders.schema';
import { BillInterface, ProductInterface } from '../interfaces/bill.interface';

export class Product implements ProductInterface {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  cost: number;
}

export class BillDto implements BillInterface {
  @ApiProperty()
  order: Order;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  issuedAt: Date;

  @ApiProperty()
  totalCost: number;

  @ApiProperty({ type: () => Product })
  products: Product[];
}
