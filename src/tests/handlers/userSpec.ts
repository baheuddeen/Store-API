import supertest from 'supertest';
import app from '../../server';
import { JwtPayload, verify } from 'jsonwebtoken';
import DataBase from '../../utilities/resetDatabase';


const request = supertest(app);
describe('Testing Endpoint: /api/users/create', () => {
  const user = {
    first_name: 'muhammad',
    last_name: 'baheuddeen',
    email: 'muhammad_handler_test@gmail.com',
    password: 'asd123',
  };
  let userId: number;
  let token: string;
  it('Testing the create endpoint', async () => {
    await request
      .post('/api/users/create')
      .send(user)
      .expect(200)
      .then((res) => {
        token = res.headers['set-cookie'][0].split('=')[1].split(';')[0];
        
        const clientSecret = process.env.JWT_CLIENT_SECRET || 'client-secret';
        const decodedJWT = verify(
          token,
          clientSecret,
        ) as JwtPayload;
        userId = decodedJWT.user_id;
      });
  });

  it('Testing the index endpoint with valid token', async () => {
    await request
      .get('/api/users/')
      .set('Cookie', `_jwt=${token}`)
      .expect(200);
  });

  it('Testing the index endpoint with invalid token', async () => {
    await request
      .get('/api/users/')
      .set('Cookie', '_jwt=invalidToken')
      .expect(401);
  });

  it('Testing the read endpoint with valid token and valid user ID', async () => {
    await request
      .get(`/api/users/${userId}`)
      .set('Cookie', `_jwt=${token}`)
      .expect(200);
  });

  it('Testing the read endpoint with valid token and valid user ID', async () => {
    await request
      .get(`/api/users/${userId}`)
      .set('Cookie', '_jwt=${invalidToken')
      .expect(401);
  });

  it('Testing the authorization endpoint with valid lead', async () => {
    await request.post('/api/users/login').send({
      email: 'muhammad_handler_test@gmail.com',
      password: 'asd123',
    }).expect(200);
  });

  it('Testing the authorization endpoint with invalid user', async () => {
    await request
      .post('/api/users/login')
      .send({
        email: 'muhammad_handler_test@gmail.com',
        password: 'Wrong Password',
      })
      .expect(401)
      .then((res) => {
        expect(res.text).toContain('invalid user information');
      });
  });

  it('Testing the userInfo endpoint with valid token', async () => {
    await request
      .get('/api/users/userInfo')
      .set('Cookie', `_jwt=${token}`);
  });

  afterAll(async () => {
    const database = new DataBase();
    await database.reset();
  });
});
