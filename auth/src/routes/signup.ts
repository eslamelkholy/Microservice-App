import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validator-error';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('User Already Exists');
    }

    const user = User.build({ email, password });
    await user.save();

    console.log(process.env.JWT_KEY);
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on Session Object
    req.session = {
      jwt: userJwt,
      ...req.session,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
