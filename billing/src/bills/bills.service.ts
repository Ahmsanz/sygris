import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill } from './schemas/bill.schema';
import { CreateBillDto } from './dto/create-bill.dto';
import { ProductInterface } from './interfaces/bill.interface';
import { Order } from './schemas/orders.schema';

@Injectable()
class BillService {
  constructor(
    @InjectModel('Bill')
    private billModel: Model<Bill>,
  ) {}

  async createBill(order: any): Promise<Bill> {
    try {
      const totalCost = order.products.reduce(
        (total: number, product: ProductInterface) => {
          return total + product.cost * product.quantity;
        },
        0,
      );
      console.log(order);
      const newBill = {
        order: order._id,
        clientId: order.clientId,
        issuedAt: new Date(),
        totalCost,
        products: order.products,
      };
      console.log(newBill);

      Logger.log('Issuing new bill');
      Logger.log(newBill);

      return this.billModel.create(newBill as CreateBillDto);
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async getBills(): Promise<Bill[]> {
    try {
      return this.billModel.find({});
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}

export default BillService;
