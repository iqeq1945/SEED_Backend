import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export interface BOOK_ITEM_INIT {
  id?: number;
  title?: string;
  content?: string;
  bookId?: number;
}

export interface BOOK_ITEM_UPDATE extends BOOK_ITEM_INIT {
  id: number;
}

export interface BOOK_ITEM extends BOOK_ITEM_INIT {
  title: string;
  content: string;
  bookId: number;
}

export const findById = async (id: number) => {
  try {
    return await prisma.book_Item.findUnique({
      where: { id: id },
      include: {
        book: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const create = async (data: BOOK_ITEM) => {
  try {
    return await prisma.book_Item.create({ data });
  } catch (err) {
    console.log(err);
  }
};

export const erase = async (id: number) => {
  try {
    return await prisma.book_Item.delete({ where: { id: id } });
  } catch (err) {
    console.log(err);
  }
};

export const update = async (id: number, data: BOOK_ITEM_UPDATE) => {
  try {
    return await prisma.book_Item.update({ where: { id: id }, data });
  } catch (err) {
    console.log(err);
  }
};

export const open = async (id: number, open: boolean) => {
  try {
    return await prisma.book_Item.update({
      where: { id: id },
      data: {
        open: open,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
