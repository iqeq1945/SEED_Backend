import { ParsedQs } from 'qs';
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
      'ZREVRANGE',
      `keyword:${id}`,
      '0',
      '-1',
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

export const delKeyword = async (
  id: number,
  value: string | string[] | ParsedQs | ParsedQs[] | undefined
) => {
  try {
    if (value === undefined) {
      return await redisCli.sendCommand([
        'ZREMRANGEBYRANK',
        `keyword:${id}`,
        '0',
        '0',
      ]);
    }
    return await redisCli.sendCommand(['ZREM', `keyword:${id}`, value]);
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
    return await redisCli.sMembers(`like:${bookId}`);
  } catch (err) {
    console.log(err);
  }
};

export const countLike = async (bookId: number) => {
  try {
    return redisCli.sendCommand(['SCARD', `like:${bookId}`]);
  } catch (err) {
    console.log(err);
  }
};

export const delLike = async (bookId: number, userId: number) => {
  try {
    return await redisCli.sendCommand(['SREM', `like:${bookId}`, `${userId}`]);
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
    return await redisCli.zAdd(`view:${bookId}`, [
      { score: Date.now(), value: `${userId}:${bookItemId}` },
    ]);
  } catch (err) {
    console.log(err);
  }
};

export const getView = async (bookId: number) => {
  try {
    return await redisCli.sendCommand([
      'ZREVRANGE',
      `view:${bookId}`,
      '0',
      '-1',
    ]);
  } catch (err) {
    console.log(err);
  }
};

export const countView = async (bookId: number) => {
  try {
    return await redisCli.sendCommand([
      'ZCOUNT',
      `view:${bookId}`,
      '-inf',
      '+inf',
    ]);
  } catch (err) {
    console.log(err);
  }
};

export const getBookItem = async (bookItemId: number) => {
  try {
    const response = await redisCli.sendCommand(['GET', `get:${bookItemId}`]);
    return JSON.parse(response);
  } catch (err) {
    console.log(err);
  }
};

export const checkBookItem = async (bookItemId: number) => {
  try {
    return await redisCli.sendCommand(['EXISTS', `get:${bookItemId}`]);
  } catch (err) {
    console.log(err);
  }
};

export const setBookItem = async (bookItemId: number, data: string) => {
  try {
    return await redisCli.sendCommand(['SETEX', `get:${bookItemId}`, 10, data]);
  } catch (err) {
    console.log(err);
  }
};
