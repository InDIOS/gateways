import cors from 'cors';
import mongoose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import api from './api';

const APP_PORT = 4100;

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/gateways', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => {
    console.log(error);
  });

app.use(cors({ origin: '127.0.0.1:4200' }));
app.use(express.json());

app.get('/test', (_, res) => {
  res.send(`It's working!`);
});

app.use('/api', api);

// 404 Not Found URL
app.use((req: Request, _res: Response, next: NextFunction) => {
  next({ code: 404, message: `Can't not '${req.method}' to URL: '${req.url}'.` });
});

// 500 Server error
app.use((error: any, _: Request, res: Response, _next: NextFunction) => {
  error.code ||= 500;
  res.status(error.code).send({ statusCode: error.code, message: error.message });
});

app.listen(APP_PORT, () => {
  console.log(`Server listening on 'http://127.0.0.1:${APP_PORT}'`);
});
