import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email Must Be Valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 250 })
      .withMessage('Password Must be between 4 and 250 Characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    console.log(`New User Created With Email = ${req.body.email}`);

    res.send(req.body.email);
  }
);

export { router as signupRouter };
