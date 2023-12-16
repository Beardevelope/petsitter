import 'dotenv/config';
import express from 'express';
import cors from 'cors';  // cors를 import
import { apiRouter } from './router/index.js';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('/static', express.static(path.join(__dirname, '../frontend')))
app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}`);
});