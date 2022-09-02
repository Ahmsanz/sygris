import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrderSchema } from './orders.schema';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
        ClientsModule.register([
          {
            name: 'CHECKOUT_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://guest:guest@localhost:5672/'],
              queue: 'bills-queue',
              queueOptions: {
                durable: false,
              },
            },
          },
        ]),
      ],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    ordersService = moduleRef.get<OrdersService>(OrdersService);
    ordersController = moduleRef.get<OrdersController>(OrdersController);
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const result = [
        {
          _id: 'orderId',
          clientId: 1,
          products: [],
          direction: 'test street',
          date: new Date(),
        },
      ];
      jest.spyOn(ordersService, 'findAll').mockResolvedValue(result);

      expect(await ordersController.findAll()).toBe(result);
    });
  });
});
