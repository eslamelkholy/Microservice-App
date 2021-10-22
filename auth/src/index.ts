import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/NotFoundError';

const app = express();
app.set('trust proxy', true); // Trust K8S Ingress Nginx Proxy
app.use(json());
app.use(
  cookieSession({
    signed: false, // Disable Encryption For JWT Because the encryption algorithm is not one for all languages
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('DB Connected Successfully ');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Auth Service Listening on Port 3000');
  });
};

startServer();
