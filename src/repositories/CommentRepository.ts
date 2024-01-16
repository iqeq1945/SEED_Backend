import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface COMMENT_INIT {
  id?: number;
  userId?: number;
  content?: string;
  status?: boolean;
  targetId?: number;
}

export interface COMMENT extends COMMENT_INIT {
  userId: number;
  content: string;
  status: boolean;
  targetId: number;
}

export interface COMMENT_UPDATE extends COMMENT_INIT {
  id: number;
  content: string;
}

export const findById = async (id: number) => {
  try {
    return await prisma.comment.findUnique({ where: { id } });
  } catch (err) {
    console.log(err);
  }
};

export const findByUser = async (userId: number) => {
  try {
    return await prisma.comment.findMany({ where: { userId: userId } });
  } catch (err) {
    console.log(err);
  }
};

export const findByTarget = async (status: boolean, targetId: number) => {
  try {
    return await prisma.comment.findMany({
      where: { targetId: targetId, status: status },
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (data: COMMENT) => {
  try {
    return await prisma.comment.create({ data });
  } catch (err) {
    console.log(err);
  }
};

export const update = async (data: COMMENT_UPDATE) => {
  try {
    return await prisma.comment.update({
      where: { id: data.id },
      data: {
        content: data.content,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const clear = async (id: number) => {
  try {
    return await prisma.comment.delete({ where: { id } });
  } catch (err) {
    console.log(err);
  }
};
