import express from 'express';
import router from './routes';

const app: express.Application = express();
const address: string = 'localhost:3000';

app.use('/', express.static('./static'));

app.use('/api', router);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;