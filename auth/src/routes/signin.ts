import express, { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validator-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email Must Be Valid'),
    body('password').trim().notEmpty().withMessage('You Must Provide Password'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    return res.status(200).send('WORKS FINE');
  }
);

export { router as signinRouter };
