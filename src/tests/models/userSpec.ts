import User, { UserType } from '../../models/db/user';
import DataBase from '../../utilities/resetDatabase';

const userModel = new User();
const baseUser: UserType = {
  id: 1,
  first_name: 'Muhammad',
  last_name: 'Baheuddeen',
  password: 'asd123',
  email: 'muhammad@gmail.com',
};
let testUser: UserType;
describe('Testing Model: userModel', () => {
  it('Must have a create method', () => {
    expect(userModel.create).toBeDefined();
  });
  it('Testing the create model with a user', async () => {
    testUser = await userModel.create(baseUser);    
    expect({
      first_name: testUser.first_name,
      last_name: testUser.last_name,
      email: testUser.email,
    }).toEqual({
      first_name: 'Muhammad',
      last_name: 'Baheuddeen',
      email: 'muhammad@gmail.com',
    });
  });
  it('Must have an index method', () => {
    expect(userModel.index).toBeDefined();
  });

  it('Testing the index model to include the user', async () => {
    const users = await userModel.index();
    expect(users).toContain({
      id: 1,
      first_name: 'Muhammad',
      last_name: 'Baheuddeen',
      email: 'muhammad@gmail.com',
    } as UserType );
  });

  it('Must have a show method', () => {
    expect(userModel.show).toBeDefined();
  });

  it('Testing the show model to return the user', async () => {
    const foundUser = await userModel.show(baseUser.id!);
    expect({
      id: foundUser.id,
      first_name: foundUser.first_name,
      last_name: foundUser.last_name,
      email: foundUser.email,
    }).toEqual({
      id: 1,
      first_name: 'Muhammad',
      last_name: 'Baheuddeen',
      email: 'muhammad@gmail.com',
    });
  });

  it('Must have a getPassword method', () => {
    expect(userModel.getPassword).toBeDefined();
  });

  it('Testing the show model to return the lead', async () => {
    const testPassword = await userModel.getPassword(baseUser.email);
    expect(testPassword).toBeDefined();
  });

  afterAll(async () => {
    const database = new DataBase();
    await database.reset();
  });
});
