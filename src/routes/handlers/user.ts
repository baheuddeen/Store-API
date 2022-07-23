import User from '../../models/db/user';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import verifySignup from '../../utilities/verifySignup.js';
import verifyLogin from '../../utilities/verifyLogin';
import generateJWT from '../../utilities/generateJWT';
import validateJWT from '../../utilities/validateJWT';
import typeJWT from '../../utilities/typeJWT';
import getUserInfoGoogle from '../../utilities/getUserInfoGoogle';
import getPayloadFromJWT from '../../utilities/getPayloadFromJWT';


const router = express.Router();
const user = new User();

const index = async (req: Request, res: Response) => {
  const users = await user.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const selctedUser = await user.show(id);
    res.json(selctedUser);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const newUser = req.body;
  try {
    const createdUser = await user.create(newUser);
    res.cookie('_jwt', generateJWT(createdUser));
    return res.send('signed up successfully');
  } catch (err) {
    return res.status(400).send({ status: false, err: `${err}` });
  }
};

const login = async (req: Request, res: Response) => {
  const password = await user.getPassword(req.body.email);
  const valid = bcrypt.compareSync(req.body.password, password);    
  if (!valid) {
    return res.status(401).json({ msg: 'unvalid passeord' });
  }
  res.cookie('_jwt', generateJWT(req.body.email));
  res.send('logged in successfully !');
};

const userInfo = async (req: Request, res: Response) => {

  switch (await typeJWT(req.cookies._jwt)) {
    case 'googleAccount':            
      const googleData = await getUserInfoGoogle(req.cookies._open_id_access_token);
      console.log(googleData);
      return res.json(googleData);

    case 'internalAccount':
      const payload = getPayloadFromJWT(req.cookies._jwt) ;   
      const email =  payload.email;        
      const userData = await user.getUserByEmail(email);
      return res.json(userData);
    
    default:
      return res.status(401).json({ msg: 'please signin first' });
  }
};

router.get('/', validateJWT, index);
router.get('/userInfo', validateJWT, userInfo);
router.get('/:id', validateJWT, show);
router.post('/create', verifySignup, create);
router.post('/login', verifyLogin, login);




export default router;
