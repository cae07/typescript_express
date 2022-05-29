import express, { Request, Response } from 'express';
import router from "./routes";

const app: express.Application = express();

const PORT: number = 8000;

app.use(express.json());

app.get('/', (_req: Request, res: Response): Response<string> => {
  return res.send("Meu primeiro CRUD com express + TypeScript");
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Online on port: ${PORT}`);
});
