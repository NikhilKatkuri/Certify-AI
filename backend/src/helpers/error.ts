import { NextFunction, Request, Response } from 'express';

function ErrorHandler(func: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default ErrorHandler;
