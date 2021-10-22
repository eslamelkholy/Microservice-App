import express, { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser });
  } catch (err) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
