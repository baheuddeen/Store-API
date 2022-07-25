import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import auth from './api/auth/auth.js';
import user from './handlers/user';
import product from './handlers/product';
import order from './handlers/order';
import orderItem from './handlers/order_item';
import cookies from 'cookie-parser';
import validateJWT from '../utilities/validateJWT.js';

var router = express.Router();

router.use(bodyParser.json());
router.use(cookies());

// users
router.use('/users', user);

// Authenication
router.use('/auth', auth);

// products
router.use('/products', product);

// orders
router.use('/orders', order);

// orders
router.use('/order_item', orderItem);

//protected get
router.get('/protected', validateJWT, (_req: Request, res: Response) => {
  return res.json({ msg: 'congratulation you are signed in!' });
});

//post test
router.post('/test', (req, res) => {
  res.send(req.query.a);
});

export default router;