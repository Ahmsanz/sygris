import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillsModule } from './bills/bill.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/checkout'),
    BillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
