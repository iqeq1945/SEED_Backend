// config/passport.js
import * as UserRepository from '../repositories/UserRepository';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

interface USER extends UserRepository.userType {
  id: number;
}

const LocalStrategy = passportLocal.Strategy;

export default (passport: passport.PassportStatic) => {
  passport.serializeUser((user: any, done: any) => {
    //console.log('serialize');
    done(null, user.id);
  });
  passport.deserializeUser(async (id: number, done: any) => {
    //DB접근
    try {
      // 로그인 시 password 정보제외 후 가져오기
      const finduser = await UserRepository.findById(id);
      done(null, finduser);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done: any) => {
        try {
          const user = await UserRepository.findByEmail(email);
          if (!user) {
            return done(null, false, {
              message: '이메일에 해당하는 유저 없음',
            });
          }
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, {
              message: '비밀번호가 일치하지 않습니다.',
            });
          }
          return done(null, user); // 성공
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
