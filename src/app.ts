import express from 'express';
import ErrorHandler from './middlewares/error.middleware';
import cors from "cors";
import routes from "./routers";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes)

app.use(ErrorHandler.handler);
export default app;
