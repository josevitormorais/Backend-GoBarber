import 'reflect-metadata'; //dependencia para utilizar o typeorm
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppErros';
import '@shared/container';
//importando a conexao com o banco no arquivo base
import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  console.log('---------------');
  console.log('Server Starting');
  console.log('---------------');
});
