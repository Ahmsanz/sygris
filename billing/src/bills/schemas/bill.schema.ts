import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BillInterface, ProductInterface } from '../interfaces/bill.interface';
import { Order } from './orders.schema';

export type BillDocument = Bill & mongoose.Document;

@Schema({ timestamps: true })
export class Bill implements BillInterface {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;

  @Prop()
  clientId: number;

  @Prop()
  issuedAt: Date;

  @Prop()
  totalCost: number;

  @Prop()
  products: ProductInterface[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);
