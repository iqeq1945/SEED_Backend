import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export interface BOOK_INIT {
  id?: number;
  title?: string;
  cycle?: string;
  introduce?: string;
  category?: string;
}
export interface BOOK extends BOOK_INIT {
  title: string;
  cycle: string;
  introduce: string;
  category: string;
  authorId: number;
}
export interface BOOK_UPDATE extends BOOK_INIT {
  id: number;
}

export const findById = async (id: number) => {
  try {
    return await prisma.book.findUnique({
      where: { id: id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        item: true,
        comment: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (data: BOOK) => {
  try {
    return await prisma.book.create({ data });
  } catch (err) {
    console.log(err);
  }
};

export const erase = async (id: number) => {
  try {
    return await prisma.book.delete({ where: { id: id } });
  } catch (err) {
    console.log(err);
  }
};

export const update = async (id: number, data: BOOK_UPDATE) => {
  try {
    return await prisma.book.update({ where: { id: id }, data });
  } catch (err) {
    console.log(err);
  }
};

export const getByKeyword = async (keyword: string) => {
  try {
    return await prisma.book.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            author: {
              name: {
                contains: keyword,
              },
            },
          },
        ],
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getByCategory = async (category: string) => {
  try {
    return await prisma.book.findMany({
      where: {
        category: category,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getList = async (
  keyword: string | undefined,
  category: string | undefined
) => {
  try {
    return await prisma.book.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            author: {
              name: {
                contains: keyword,
              },
            },
          },
        ],
        category,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getListQuery = async (
  keyword: string | undefined,
  category: string | undefined,
  skip: number | undefined,
  take: number | undefined
) => {
  try {
    return await prisma.book.findMany({
      skip,
      take,
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            author: {
              name: {
                contains: keyword,
              },
            },
          },
        ],
        category,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
