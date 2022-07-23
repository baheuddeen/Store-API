import express, { Request, Response } from 'express';
import validateJWT from '../../utilities/validateJWT';
import OrderItem from '../../models/db/order_item';


const router = express.Router();
const orderItem = new OrderItem();

const show = async (req: Request, res: Response) => {
  try {
    const selectedutems = await orderItem.show(parseInt(req.params.id, 10));
    res.json(selectedutems);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const createdOrder = await orderItem.create(req.body);
    return res.json(createdOrder);
  } catch (err) {
    return res.status(400).send({ status: false, err: `${err}` });
  }
};



router.get('/:id', validateJWT, show);
router.post('/create', validateJWT, create);





export default router;
