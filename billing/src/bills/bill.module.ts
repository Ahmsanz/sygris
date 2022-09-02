import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillsController } from './bill.controller';
import { BillSchema } from './schemas/bill.schema';
import BillService from './bills.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }])],
  providers: [BillService],
  controllers: [BillsController],
})
export class BillsModule {}
