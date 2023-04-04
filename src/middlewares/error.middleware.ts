import { type ErrorRequestHandler } from 'express'

class ErrorHandler extends Error {
  public static handler: ErrorRequestHandler = (err, _req, res, _next) => {
    res.status(err.status || 500).json({ message: err.message })
  }
}

export default ErrorHandler
