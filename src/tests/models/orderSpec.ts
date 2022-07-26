import Order, { OrderType } from '../../models/db/order';
import User from '../../models/db/user';
import DataBase from '../../utilities/resetDatabase';

const userModel = new User();
const orderModel = new Order();
const baseOrder: OrderType = {
  id: 10,
  user_id: 0,
  status: 'active',
};

let testOrder: OrderType;
describe('Testing Model: orderModel', () => {
  beforeAll(async () => {
    const user = await userModel.create({
      id:1,
      first_name: 'muhammad',
      last_name: 'mahmoud',
      password: 'beep-boop',
      email:'test_user@gmail.com',
    });
    
    if (user.id) {
      baseOrder.user_id = user.id;
    } 
    
  });

  it('Must have a create method', () => {
    expect(orderModel.create).toBeDefined();
  });
  it('Testing the create model with a order', async () => {
    testOrder = await orderModel.create(baseOrder);        
    expect(testOrder).toEqual({
      id: 10,
      user_id: 1,
      status: 'active',
    });
  });

  
  it('Must have a show method', () => {
    expect(orderModel.show).toBeDefined();
  });
  it('Testing the show model to return the order', async () => {
    const foundOrder = await orderModel.show(baseOrder.user_id);
     
    expect(foundOrder[0]).toEqual({
      id: 10,
      user_id: 1,
      status: 'active',
    } as OrderType);
  });

  it('Must have an complete method', () => {
    expect(orderModel.complete).toBeDefined();
  });
  it('Testing the complete model to complpete the order', async () => {
    const completedOrder = await orderModel.complete(baseOrder.id!);
    expect(completedOrder.status).toEqual('completed');
  });
  
  afterAll(async () => {
    const database = new DataBase();
    await database.reset();
  });
});
