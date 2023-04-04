import { Request, Response, Router } from "express";

const healthRouter: Router = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  const healthCheck = { message: 'Hello World!!! Aplicação funcionando com sucesso!' }
  res.status(200).json(healthCheck);
});

export default healthRouter;