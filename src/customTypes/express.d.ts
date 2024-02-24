import { reqUserType } from '../repositories/UserRepository';

declare global {
  namespace Express {
    interface User extends reqUserType {
      id: number;
      email: string;
      name: string;
      admin: boolean;
      seed: number;
    }
    interface Request {
      user?: User;
    }
  }
}
