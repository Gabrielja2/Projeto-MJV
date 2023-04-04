import { ErrorRequestHandler } from 'express';

class ErrorHandler {
  public static handler: ErrorRequestHandler = (err, req, res, _next) => {
    res.status(err.status || 500).json({ message: err.message });
  };
}

export default ErrorHandler;