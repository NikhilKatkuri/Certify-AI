import { NextFunction, Request, Response } from 'express';

function ErrorHandler(func: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      console.error('Error caught in ErrorHandler:', error);

      // Provide more detailed error information
      const errorMessage =
        error instanceof Error ? error.message : 'Internal Server Error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      // Log the full error for debugging
      if (errorStack) {
        console.error('Stack trace:', errorStack);
      }

      res.status(500).json({
        error: 'Internal Server Error',
        message: errorMessage,
        // Include stack trace only in non-production environments
        ...(process.env['NODE_ENV'] !== 'production' && errorStack
          ? { stack: errorStack }
          : {}),
      });
    }
  };
}

export default ErrorHandler;
