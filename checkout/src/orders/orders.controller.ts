import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { Order } from './orders.schema';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() newOrder: OrderDto): Promise<Order> {
    try {
      return this.ordersService.create(newOrder);
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Get()
  async findAll(): Promise<Order[]> {
    try {
      return this.ordersService.findAll();
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
