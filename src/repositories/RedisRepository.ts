import { redisCli } from '../config/redis';

export const setKeyword = async (keyword: string, id: number) => {
  try {
    return await redisCli.zAdd(id, [{ score: Date.now(), value: keyword }]);
  } catch (err) {
    console.log(err);
  }
};

export const getKeyword = async (id: number) => {
  try {
    return await redisCli.zRange(id, -5, -1);
  } catch (err) {
    console.log(err);
  }
};
