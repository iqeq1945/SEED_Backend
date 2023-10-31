import express, {
  Application,
  Request,
  json,
  Response,
  urlencoded,
} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import UserController from './controllers/user';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './config/passport';
import dotenv from 'dotenv';

dotenv.config();
passportConfig(passport);

const app: Application = express();
const port: number = 3000;

// Other settings
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

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
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

// Routes
app.use('/users', UserController);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
