import { OrderDto } from './orders/dto/order.dto';
import { OrderInterface } from './orders/interfaces/order.interface';

export class OrderMessage {
  order: OrderInterface;
  constructor(order: OrderDto) {
    this.order = order;
  }
}
