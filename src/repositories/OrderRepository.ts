import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export interface Order {
  id?: number;
  userId: number;
  bookItemId: number;
}

export const findById = async (id: number) => {
  try {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (data: Order) => {
  try {
    return await prisma.order.create({ data });
  } catch (err) {
    console.log(err);
  }
};

export const findByUserId = async (userId: number) => {
  try {
    return prisma.order.findMany({
      where: { userId },
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findByBookItemId = async (bookItemId: number) => {
  try {
    return prisma.order.findMany({
      where: { bookItemId },
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
