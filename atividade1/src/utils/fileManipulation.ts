import fs from "fs/promises";
import User from "../User";

async function read() {
  const data = await fs.readFile("./users.json", "utf-8");

  const users: User[] = JSON.parse(data);

  return users;
}

async function write(data: User[]): Promise<void> {
  await fs.writeFile("./users.json", JSON.stringify(data));
}

export {
  read, write
};
