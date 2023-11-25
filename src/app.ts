import express, { Application } from 'express';
import cors from 'cors';
import { UserRouter } from './app/Modules/User/User.router';
const app: Application = express();

//parser
app.use(express.json());
app.use(express.text());
app.use(cors());

//Application Routes
app.use('/api/users', UserRouter);

app.get('/', (req, res) => {
  res.send('Hello There');
});

export default app;
