import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.headers['x-access-token'];

  if (!token) {
    return res
      .status(401)
      .json({ status: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);

    //Set req.user to the decoded jwt token
    req.body.user = decoded;
  } catch (err) {
    return res.status(403).json({ status: 'Invalid Token' });
  }

  return next();
};

export default verifyToken;
