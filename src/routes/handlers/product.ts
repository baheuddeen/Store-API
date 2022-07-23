import Product from '../../models/db/product';
import express, { Request, Response } from 'express';
import validateJWT from '../../utilities/validateJWT';
import verifyProduct from '../../utilities/verifyProduct';
  
const router = express.Router();
const product = new Product();

const index = async (req: Request, res: Response) => {
  const users = await product.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const selctedProduct = await product.show(id);
    res.json(selctedProduct);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const newProduct = req.body;
  try {
    const createdProduct = await product.create(newProduct);
    return res.json(createdProduct);
  } catch (err) {
    return res.status(400).send({ status: false, err: `${err}` });
  }
};

router.get('/', index);
router.get('/:id', show);
router.post('/create', validateJWT, verifyProduct, create);

export default router;
