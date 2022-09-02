import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingSchema } from './schemas/shipping.schema';
import { ShippingsController } from './shipping.controller';
import ShippingService from './shipping.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shipping', schema: ShippingSchema }]),
  ],
  providers: [ShippingService],
  controllers: [ShippingsController],
})
export class ShippingsModule {}
