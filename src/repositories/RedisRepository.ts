import { redisCli } from '../config/redis';

export const setTest = async () => {
  try {
    await redisCli.set('keyword', 'val');
    const response = await redisCli.get('keyword');
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
