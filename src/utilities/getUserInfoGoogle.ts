import axios from 'axios';
export default async (access_token: string):Promise<Object> => {
  var config = {
    method: 'get',
    url: 'https://openidconnect.googleapis.com/v1/userinfo',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const res = await axios(config);
    return res.data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};