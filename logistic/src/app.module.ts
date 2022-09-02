import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShippingsModule } from './shippings/shipping.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/checkout'),
    ShippingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
