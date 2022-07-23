import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.query.code) {
    const result = await axios({
      'method': 'post',
      'baseURL': 'https://oauth2.googleapis.com/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: {
        code: `${req.query.code}`,
        client_id: '174116080206-49l68to1e08ni1nlv9savvu0m1r8qkkm.apps.googleusercontent.com',
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/api/auth',
        grant_type: 'authorization_code',
      },
    }); 
    console.log(result.data);   
    res.cookie('_jwt', result.data.id_token);
    res.cookie('_open_id_access_token', result.data.access_token); 
    res.cookie('_open_id_refresh_token', result.data.refresh_token); 
     
    res.writeHead(301,
      { Location: 'http://localhost:3000/' },
    );
    return res.send();
  }
  res.send('some thing went wrong'); 
});

export default router;


