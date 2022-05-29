import { validateFields } from './middlewares';
import { Router, Request, Response } from "express";
import StatusCode from "./enums/StatusCode";
import { read, write } from "./utils/fileManipulation";
import User from './User';

const router = Router();
const NotFoundMessage = "Usuário não encontrado";

router.get("/users", async (
  req: Request,
  res: Response
): Promise<Response<User[]>> => {
  const users = await read();

  return res.status(StatusCode.OK).json(users);
})

router.get("/users/:id", async (
  req: Request,
  res: Response,
): Promise<Response<User | string>> => {
  const { id } = req.params;

  const users = await read();
  const user = users.find((user) => user.id === id);

  if (!user) return res.status(StatusCode.NOT_FOUND).send(NotFoundMessage);

  return res.status(StatusCode.OK).json(user);
})

router.post("/users", validateFields, async (
  req: Request,
  res: Response,
): Promise<Response<User>> => {
  const user: User = req.body;

  const users = await read();
  users.push(user);
  
  await write(users);
  
  return res.status(StatusCode.CREATED).json(user);
});

router.put("/users/:id", validateFields, async (
  req: Request,
  res: Response,
): Promise<Response<User> | String> => {
  const { id } = req.params;

  const userToEdit: User = req.body;

  const users = await read();

  const index = users.findIndex((user) => user.id === id);

  if (!index) return res.status(StatusCode.NOT_FOUND).send(NotFoundMessage);

  users.splice(index, 1, userToEdit);

  await write(users);

  return res.status(StatusCode.OK).json(userToEdit);
});

router.delete("/user/:id", async (
  req: Request,
  res: Response,
): Promise<Response<string>> => {
  const { id } = req.params;

  const users = await read();
  const index = users.findIndex((user) => user.id === id);

  if (!index) return res.status(StatusCode.NOT_FOUND);

  users.slice(index, 1);

  await write(users);

  return res.status(StatusCode.OK).send(`Usuário com id: ${id} deletado com sucesso`);
});