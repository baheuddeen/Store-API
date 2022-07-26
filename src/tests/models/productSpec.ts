import Product, { ProductType } from '../../models/db/product';
import DataBase from '../../utilities/resetDatabase';

const productModel = new Product();
const baseProduct: ProductType = {
  id: 1,
  name: 'footBall',
  price: 15,
  category: 'Toys',
};

let testProduct: ProductType;
describe('Testing Model: productModel', () => {
  it('Must have a create method', () => {
    expect(productModel.create).toBeDefined();
  });
  it('Testing the create model with a product', async () => {
    testProduct = await productModel.create(baseProduct);    
    expect({
      name: testProduct.name,
      price: testProduct.price,
      category: testProduct.category,
    }).toEqual({
      name: 'footBall',
      price: 15,
      category: 'Toys',
    });
  });
  it('Must have an index method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('Testing the index model to include the product', async () => {
    const users = await productModel.index();
    expect(users).toContain({
      id: 1,
      name: 'footBall',
      price: 15,
      category: 'Toys',
    } as ProductType );
  });

  it('Must have a show method', () => {
    expect(productModel.show).toBeDefined();
  });

  it('Testing the show model to return the product', async () => {
    const foundProduct = await productModel.show(baseProduct.id!);
     
    expect({
      name: foundProduct.name,
      price: foundProduct.price,
      category: foundProduct.category,
    }).toEqual({
      name: 'footBall',
      price: 15,
      category: 'Toys',
    });
  });

  afterAll(async () => {
    const database = new DataBase();
    await database.reset();
  });
});
