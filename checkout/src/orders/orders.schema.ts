import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './dto/order.dto';
import { OrderInterface } from './interfaces/order.interface';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order implements OrderInterface {
  @Prop()
  clientId: number;

  @Prop()
  date: Date;

  @Prop()
  direction: string;

  @Prop()
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
