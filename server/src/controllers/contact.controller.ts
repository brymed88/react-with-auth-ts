import { Request, Response } from 'express';
import contactService from '../services/contact.service.js';
const contactController: any = {};

contactController.contactForm = async (req: Request, res: Response) => {
  try {
    res.json(await contactService.contactForm(req.body));
  } catch (err: any) {
    console.log('Contact form message error', err.message);
    return res.status(400).json({ status: 'Message send failed' });
  }
};

export default contactController;
