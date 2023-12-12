import 'dotenv/config';
import express from 'express';
import { SERVER_PORT } from '../.env';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});
