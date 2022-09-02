import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { Shipping } from './schemas/shipping.schema';

@Injectable()
class ShippingService {
  constructor(
    @InjectModel('Shipping')
    private shippingModel: Model<Shipping>,
  ) {}

  async createShipping(order: any): Promise<Shipping> {
    try {
      const newShipping = {
        order: order._id,
        clientId: order.clientId,
        issuedAt: new Date(),
        address: order.direction,
        products: order.products,
      };
      console.log(newShipping);

      Logger.log('Issuing new shipping');
      Logger.log(newShipping);

      return this.shippingModel.create(newShipping as CreateShippingDto);
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async getShippings(): Promise<Shipping[]> {
    try {
      return this.shippingModel.find({});
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}

export default ShippingService;
