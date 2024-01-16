import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export interface userType {
  id?: number;
  email: string;
  name: string;
  password: string;
}
export interface reqUserType {
  id: number;
  email: string;
  name: string;
  admin: boolean;
}
export const findById = async (id: number) => {
  try {
    return await prisma.user.findUnique({
      where: { id: id },
      select: { id: true, name: true, email: true, admin: true },
    });
  } catch (err) {
    console.log(err);
  }
};
export const findByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email: email } });
  } catch (err) {
    console.log(err);
  }
};

export const findByName = async (name: string) => {
  try {
    return await prisma.user.findUnique({ where: { name: name } });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (data: userType) => {
  try {
    return await prisma.user.create({ data });
  } catch (err) {
    console.log(err);
  }
};
