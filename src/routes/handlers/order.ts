import express, { Request, Response } from 'express';
import validateJWT from '../../utilities/validateJWT';
import getPayloadFromJWT from '../../utilities/getPayloadFromJWT';
import Order from '../../models/db/order';


const router = express.Router();
const order = new Order();

const show = async (req: Request, res: Response) => {
  const content = getPayloadFromJWT(req.cookies._jwt);
  const user_id = content.user_id;
  try {
    const selectedOrders = await order.show(user_id);
    res.json(selectedOrders);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const content = getPayloadFromJWT(req.cookies._jwt);
  const newOrder = {
    id: Date.now(),
    user_id : content.user_id,
    status: 'active',
  };

  try {
    const createdOrder = await order.create(newOrder);
    return res.json(createdOrder);
  } catch (err) {
    return res.status(400).send({ status: false, err: `${err}` });
  }
};

const complete = async (req: Request, res: Response) => {    
  try {
    const selectedOrders = await order.complete(req.body.id);
    res.json(selectedOrders);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};


router.get('/', validateJWT, show);
router.post('/create', validateJWT, create);
router.post('/complete', validateJWT, complete);





export default router;
