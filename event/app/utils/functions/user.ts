import { prisma } from "./prisma";

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  return { user };
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return { user };
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  return { user };
}

export async function getUsers() {
  const user = await prisma.user.findMany();
  return { user };
}
