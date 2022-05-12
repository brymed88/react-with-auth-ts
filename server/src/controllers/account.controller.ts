import accountService from '../services/account.service.js';
import { Request, Response } from 'express';

const accountController: any = {};

accountController.login = async (req: Request, res: Response) => {
  try {
    res.json(await accountService.login(req.body));
  } catch (err: any) {
    console.log(`User login failed - user: ${req.body.email}`, err.message);
    return res.status(400).json({ status: 'User login failed' });
  }
};

accountController.create = async (req: Request, res: Response) => {
  try {
    res.json(await accountService.create(req.body));
  } catch (err: any) {
    console.log(
      `Account creation failed - user: ${req.body.email}`,
      err.message
    );
    return res.status(400).json({ status: 'Account creation failed' });
  }
};

accountController.generateCode = async (req: Request, res: Response) => {
  try {
    return res.json(await accountService.generateCode(req.body));
  } catch (err: any) {
    console.log('Error while generating one-time code', err.message);
    return res.status(400).json({ status: 'invalid' });
  }
};

accountController.verifyCode = async (req: Request, res: Response) => {
  try {
    return res.json(await accountService.verifyCode(req.body));
  } catch (err: any) {
    console.log(`Error verifying code - user: ${req.body.email}`, err.message);
    return res.status(400).json({ status: 'invalid' });
  }
};

accountController.verifyToken = (req: Request, res: Response) => {
  try {
    /*
     *req.body.user is passed in from auth middleware
     *This could be utilized to check db for user permissions
     */

    if (req.body.token) {
      return res.status(200).json({ status: 'Valid Token' });
    }
    return res.status(400).json({ status: 'invalid' });
  } catch (err: any) {
    console.log(`Error verifying token - user: ${req.body.email}`, err.message);
    return res.status(400).json({ status: 'invalid' });
  }
};

accountController.passReset = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await accountService.passReset(req.body));
  } catch (err: any) {
    console.log(
      `Error while resetting password - user: ${req.body.email}`,
      err.message
    );
    return res.status(400).json({ status: 'invalid' });
  }
};

export default accountController;
