import { PrismaClient } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

interface Notification {
  userId: number;
  json: string;
}

export const findById = async (id: number) => {
  try {
    return await prisma.notification.findUnique({
      where: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findByUserId = async (userId: number) => {
  try {
    return await prisma.notification.findMany({
      where: { userId },
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (data: Notification) => {
  try {
    return await prisma.notification.create({ data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteOne = async (id: number) => {
  try {
    return await prisma.notification.delete({ where: { id } });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAll = async (userId: number) => {
  try {
    return await prisma.notification.deleteMany({ where: { userId } });
  } catch (err) {
    console.log(err);
  }
};
