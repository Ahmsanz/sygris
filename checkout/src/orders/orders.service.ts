import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderMessage } from '../order.event';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderInterface } from './interfaces/order.interface';
import { Order, OrderDocument } from './orders.schema';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('CHECKOUT_SERVICE')
    private readonly client: ClientProxy,
    @InjectModel('Order')
    private orderModel: Model<OrderDocument>,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.client.connect();
      console.log('connected to RabbitMQ Service');
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async create(order: OrderInterface): Promise<Order> {
    const savedOrder = await this.orderModel.create(order as CreateOrderDto);

    const orderMessage = new OrderMessage(savedOrder);

    this.client.emit<string, OrderMessage>('ship_order', orderMessage);
    this.client.emit<string, OrderMessage>('emit_bill', orderMessage);

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    try {
      return this.orderModel.find();
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
