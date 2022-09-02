import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {
  ProductInterface,
  ShippingInterface,
} from '../interfaces/shipping.interface';

import { Order } from './orders.schema';

export type ShippingDocument = Shipping & mongoose.Document;

@Schema({ timestamps: true })
export class Shipping implements ShippingInterface {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;

  @Prop()
  clientId: number;

  @Prop()
  issuedAt: Date;

  @Prop()
  address: string;

  @Prop()
  products: ProductInterface[];
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
