import supertest from 'supertest';
import app from '../../server';
import DataBase from '../../utilities/resetDatabase';
import { ProductType } from '../../models/db/product';
import { UserType } from '../../models/db/user';


const request = supertest(app);
describe('Testing Endpoint: /api/products/create', () => {
  const product :ProductType = {
    name: 'cup',
    price: 10,
    category: 'kichen',
  };
  let token: string;

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
      .post('/api/products/create')
      .set('Cookie', `_jwt=${token}`)
      .send(product)
      .expect(200);
  });

  it('Testing the create endpoint without token', async () => {
    await request
      .post('/api/products/create')
      .set('Cookie', '_jwt=invalidToken')
      .send(product)
      .expect(401);
  });


  it('Testing the index endpoint', async () => {
    await request
      .get('/api/products/')
      .expect(200);
  });

  it('Testing the read endpoint with valid token and valid product ID', async () => {
    await request
      .get('/api/products/1')
      .expect(200);
  });
  
  afterAll(async () => {
    const database = new DataBase();
    await database.reset();
  });
});
