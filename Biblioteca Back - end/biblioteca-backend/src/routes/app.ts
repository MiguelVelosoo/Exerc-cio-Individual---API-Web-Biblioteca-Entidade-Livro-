import express from 'express';
import cors from 'cors';
import livroRouter from './routes/livros';
import { AppDataSource } from '../data-source';

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source inicializado');
    
    app.use(cors());
    app.use(express.json());
    app.use(livroRouter);
    
    const port = 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(error => console.log(error));
