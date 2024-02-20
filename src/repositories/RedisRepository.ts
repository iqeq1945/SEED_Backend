import { redisCli } from '../config/redis';

export const setKeyword = async (keyword: string, id: number) => {
  try {
    return await redisCli.zAdd(`keyword:${id}`, [
      { score: Date.now(), value: keyword },
    ]);
  } catch (err) {
    console.log(err);
  }
};

export const getKeyword = async (id: number) => {
  try {
    return await redisCli.sendCommand([
      'ZRANGE',
      `keyword:${id}`,
      '-5',
      '-1',
      'REV',
    ]);
  } catch (err) {
    console.log(err);
  }
};

export const countKeyword = async (id: number) => {
  try {
    return await redisCli.sendCommand([
      'ZCOUNT',
      `keyword:${id}`,
      '-inf',
      '+inf',
    ]);
  } catch (err) {
    console.log(err);
  }
};

export const delKeyword = async (id: number) => {
  try {
    return await redisCli.sendCommand(['ZMPOPMIN', `keyword:${id}`]);
  } catch (err) {
    console.log(err);
  }
};

export const setLike = async (bookId: number, userId: number) => {
  try {
    return await redisCli.sAdd(`Like:${bookId}`, `${userId}`);
  } catch (err) {
    console.log(err);
  }
};

export const getLike = async (bookId: number) => {
  try {
    return await redisCli.sMembers(`Like:${bookId}`);
  } catch (err) {
    console.log(err);
  }
};

export const countLike = async (bookId: number) => {
  try {
    return redisCli.sendCommand(['scard', `Like:${bookId}`]);
  } catch (err) {
    console.log(err);
  }
};

export const delLike = async (bookId: number, userId: number) => {
  try {
    return await redisCli.sendCommand(['SREM', `Like:${bookId}`, `${userId}`]);
  } catch (err) {
    console.log(err);
  }
};

export const setView = async (
  bookId: number,
  bookItemId: number,
  userId: number
) => {
  try {
    return await redisCli.sAdd(`view:${bookId}`, `${userId}:${bookItemId}`);
  } catch (err) {
    console.log(err);
  }
};

export const getView = async (bookId: number) => {
  try {
    return await redisCli.sMembers(`view:${bookId}`);
  } catch (err) {
    console.log(err);
  }
};

export const countView = async (bookId: number) => {
  try {
    return await redisCli.sendCommand(['scard', `view:${bookId}`]);
  } catch (err) {
    console.log(err);
  }
};
