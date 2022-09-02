import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Shipping } from './schemas/shipping.schema';
import ShippingService from './shipping.service';

@Controller('shippings')
export class ShippingsController {
  constructor(private shippingsService: ShippingService) {}

  @EventPattern('ship_order') async handleMessagePrinted(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    try {
      const { order } = data;
      Logger.log('incoming order');
      Logger.log(order);

      return this.shippingsService.createShipping(order);
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Get()
  async findAll(): Promise<Shipping[]> {
    try {
      return this.shippingsService.getShippings();
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
