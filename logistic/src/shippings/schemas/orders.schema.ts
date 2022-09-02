import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Product {
  id: number;
  quantity: number;
  cost: number;
}

export interface OrderInterface {
  clientId: number;
  date: Date;
  direction: string;
  products: Product[];
}

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
