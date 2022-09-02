import { Body, Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Bill } from './schemas/bill.schema';
import BillService from './bills.service';

@Controller('bills')
export class BillsController {
  constructor(private billsService: BillService) {}

  @EventPattern('emit_bill') async handleMessagePrinted(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    try {
      const { order } = data;
      Logger.log('incoming order');
      Logger.log(order);

      return this.billsService.createBill(order);
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Get()
  async findAll(): Promise<Bill[]> {
    try {
      return this.billsService.getBills();
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
