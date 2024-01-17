import { reqUserType } from '../repositories/UserRepository';

declare global {
  namespace Express {
    interface User extends reqUserType {
      id: number;
      email: string;
      name: string;
      status: boolean;
    }
    interface Request {
      user?: User;
    }
  }
}
