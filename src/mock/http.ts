import express from 'express';
import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from './handlers';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(createMiddleware(...handlers));

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
