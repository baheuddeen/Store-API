import supertest from 'supertest';
import app from '../../server';
import DataBase from '../../utilities/resetDatabase';
import { UserType } from '../../models/db/user';
import { ProductType } from '../../models/db/product';
import { OrderItemType } from '../../models/db/order_item';


const request = supertest(app);
describe('Testing Endpoint: /api/orders/create', () => {
  let token: string;
  let orderId: number;
  let productId: number;
  let orderItem: OrderItemType;

  beforeAll(async () => {
    const user: UserType = {
      first_name: 'muhammad',
      last_name: 'baheuddeen',
      email: 'muhammad_handler_test@gmail.com',
      password: 'asd123',
    };

    const product: ProductType = {
      name: 'headSet',
      price: 400,
      category: 'Technology',
    };
    
    await request
      .post('/api/users/create')
      .send(user)
      .expect(200)
      .then((res) => {
        token = res.headers['set-cookie'][0].split('=')[1].split(';')[0];
      });

    await request
      .post('/api/products/create')
      .set('Cookie', `_jwt=${token}`)
      .send(product)
      .expect(200)
      .then((res) => {
        productId = res.body.id;
      });

    await request
      .post('/api/orders/create')
      .set('Cookie', `_jwt=${token}`)
      .send()
      .expect(200)
      .then((res) => {
        orderId = res.body.id;
      });

    if (productId && orderId) {
      orderItem = {
        product_id: productId,
        order_id: orderId,
        quantity: 5,
      };
    }

  });


  it('Testing the create endpoint', async () => {

    await request
      .post('/api/order_item/create')
      .set('Cookie', `_jwt=${token}`)
      .send(orderItem)
      .expect(200);
  });

  
  it('Testing the index endpoint', async () => {
    await request
      .get(`/api/order_item/${orderId}`)
      .set('Cookie', `_jwt=${token}`)
      .send(orderItem)
      .expect(200)
      .then((res) => {
        expect(res.body[0].order_id).toBe(orderId);
      });
  });

  afterAll(async () => {
    const database = new DataBase();
    await database.reset();
  });
});