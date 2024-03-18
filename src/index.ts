import express, {
  Application,
  Request,
  json,
  Response,
  urlencoded,
} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './config/passport';
import dotenv from 'dotenv';
import { redisCli } from './config/redis';
import RedisStore from 'connect-redis';
import UserController from './controllers/user';
import BookController from './controllers/book';
import BookItemController from './controllers/bookItem';
import RedisController from './controllers/redis';
import OrderController from './controllers/order';
import CommentController from './controllers/comment';
import schedule from 'node-schedule';

dotenv.config();
passportConfig(passport);

const app: Application = express();
const port: number = 3000;

// Other settings
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

// Passport settings
app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new RedisStore({ client: redisCli, prefix: 'session:' }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

// Routes
app.use('/users', UserController);
app.use('/books', BookController);
app.use('/book-items', BookItemController);
app.use('/redis', RedisController);
app.use('/order', OrderController);
app.use('/comments', CommentController);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
  schedule.scheduleJob('0 15 16 * * *', function () {
    console.log(new Date());
  });
});
