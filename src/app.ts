import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();

//parser
app.use(express.json());
app.use(express.text());
app.use(cors());

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

export default app;
