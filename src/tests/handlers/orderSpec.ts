import supertest from 'supertest';
import app from '../../server';
import DataBase from '../../utilities/resetDatabase';
import { UserType } from '../../models/db/user';


const request = supertest(app);
describe('Testing Endpoint: /api/orders/create', () => {
  let token: string;
  let orderId: number;

  beforeAll(async () => {
    const user: UserType = {
      first_name: 'muhammad',
      last_name: 'baheuddeen',
      email: 'muhammad_handler_test@gmail.com',
      password: 'asd123',
    };
    
    await request
      .post('/api/users/create')
      .send(user)
      .expect(200)
      .then((res) => {
        token = res.headers['set-cookie'][0].split('=')[1].split(';')[0];
      });
  });


  it('Testing the create endpoint', async () => {

    await request
      .post('/api/orders/create')
      .set('Cookie', `_jwt=${token}`)
      .send()
      .expect(200)
      .then((res) => {
        orderId = res.body.id;
      });
      
  });

  it('Testing the complete endpoint', async () => {

    await request
      .post('/api/orders/complete')
      .set('Cookie', `_jwt=${token}`)
      .send({ id: `${orderId}` })
      .expect(200).then((res) => {
        expect(res.body.status).toEqual('completed');
      });
  });

  it('Testing the index endpoint', async () => {

    await request
      .get('/api/orders/')
      .set('Cookie', `_jwt=${token}`)
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body[0].id).toEqual(orderId);
      });
  });

  afterAll(async () => {
    const database = new DataBase();
    await database.reset();
  });
});
