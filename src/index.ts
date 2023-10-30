import express, { Application, Request, json, Response, urlencoded } from 'express'
import morgan from 'morgan';
import cors from 'cors';

const app: Application = express()

const port: number = 3000

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));
  
app.use(morgan('dev'));


app.get('/bro', (req: Request, res: Response) => {
    res.send('Hello bro')
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})