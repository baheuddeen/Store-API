import OrderItem, { OrderItemType } from '../../models/db/order_item';
import User from '../../models/db/user';
import Product from '../../models/db/product';
import Order from '../../models/db/order';
import DataBase from '../../utilities/resetDatabase';


const userModel = new User();
const productModel = new Product();
const orderModel = new Order();
const orderItemModel = new OrderItem();
const baseOrderItem: OrderItemType = {
  order_id : 0,
  product_id : 0,
  quantity : 4,
};

let testOrderItem: OrderItemType;
describe('Testing Model: orderItemModel', () => {
  beforeAll(async () => {
    const user = await userModel.create({
      id:1,
      first_name: 'muhammad',
      last_name: 'mahmoud',
      password: 'beep-boop',
      email:'test_user@gmail.com',
    });
    
    const order = await orderModel.create({
      user_id: user.id!,
      id: 1,
      status: 'active',
    });

    const product = await productModel.create({
      id: 1,
      name: 'chair',
      price: 25,
      category: 'furniture',
    });

    if (product.id) baseOrderItem.product_id = product.id;
    if (order.id) baseOrderItem.order_id = order.id;
    
  });

  it('Must have a create method', () => {
    expect(orderItemModel.create).toBeDefined();
  });
  it('Testing the create model with a orderItem', async () => {
    testOrderItem = await orderItemModel.create(baseOrderItem);        
    expect(testOrderItem).toEqual({
      order_id: 1,
      product_id: 1,
      quantity: 4,
      price: 100,
    });
  });

  
  // it('Must have a show method', () => {
  //   expect(orderItemModel.show).toBeDefined();
  // });
  // it('Testing the show model to return the orderItem', async () => {
  //   const foundOrderItem = await orderItemModel.show(baseOrderItem.user_id);
     
  //   expect(foundOrderItem[0]).toEqual({
  //     id: 10,
  //     user_id: 1,
  //     status: 'active',
  //   } as OrderItemType);
  // });

  // it('Must have an complete method', () => {
  //   expect(orderItemModel.complete).toBeDefined();
  // });
  // it('Testing the complete model to complpete the orderItem', async () => {
  //   const completedOrderItem = await orderItemModel.complete(baseOrderItem.id!);
  //   expect(completedOrderItem.status).toEqual('completed');
  // });

  afterAll(async () => {
    const database = new DataBase();
    await database.reset();
  });
});
