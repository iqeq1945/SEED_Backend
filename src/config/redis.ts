import { createClient } from 'redis';

//* Redis 연결
const redisClient = createClient({ legacyMode: true }); // legacy 모드 반드시 설정 !!
redisClient.on('connect', () => {
  console.info('Redis connected!');
});
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)

export const redisCli = redisClient.v4;
