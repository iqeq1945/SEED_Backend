import { PrismaClient } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

export interface ORDER {
  id?: number;
  userId: number | undefined;
  bookId: number | undefined;
  bookItemId?: number | undefined;
}

export interface ORDER_CREATE extends ORDER {
  id?: number;
  userId: number;
  bookId: number;
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

export const create = async (data: ORDER_CREATE) => {
  try {
    const response = await prisma.order.create({
      data,
    });
    return await prisma.order.update({
      where: {
        id: response.id,
      },
      data: {
        user: {
          update: {
            where: {
              id: data.userId,
            },
            data: {
              seed: { decrement: 1 },
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findByQuery = async (data: ORDER) => {
  try {
    return prisma.order.findMany({
      where: {
        userId: data.userId,
        bookId: data.bookId,
      },
      include: {
        user: { select: { id: true, email: true, name: true } },
        book: { select: { id: true, title: true } },
        bookItem: { select: { id: true, title: true } },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findByUserAndBookItem = async (
  userId: number,
  bookItemId: number
) => {
  try {
    return prisma.order.findMany({
      where: {
        userId,
        bookItemId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
