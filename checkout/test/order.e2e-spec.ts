import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { OrdersModule } from '../src/orders/orders.module';
import * as supertest from 'supertest';

describe('PostController', () => {
  let app: NestExpressApplication;

  const apiClient = () => {
    return supertest(app.getHttpServer());
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'test' }), // we use Mongoose here, but you can also use TypeORM
        OrdersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(3333);
  });

  afterAll(async () => {
    await (app.get(getConnectionToken()) as Connection).db.dropDatabase();
    await app.close();
  });

  it('creates a new order', async () => {
    await apiClient()
      .post('/orders')
      .send({
        clientId: 11,
        direction: 'Test Direction',
        products: [
          {
            id: 21,
            quantity: 2,
            cost: 10,
          },
          {
            id: 22,
            quantity: 2,
            cost: 15,
          },
        ],
      })
      .expect(201);
  });

  it('gets all orders', async () => {
    await apiClient()
      .get('/orders')
      .expect(200)
      .expect((res) => expect(res.body[0]).toHaveProperty('clientId', 11));
  });
});
