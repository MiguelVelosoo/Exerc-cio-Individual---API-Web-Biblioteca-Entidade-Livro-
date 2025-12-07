import { Request, Response, NextFunction } from 'express';
import {
  criarLivro,
  listarLivros,
  buscarLivroPorId,
  atualizarLivro,
  deletarLivro
} from '../repositories/LivroRepository';

export const postLivro = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validação de negócio
    if (!req.body.titulo || !req.body.autor || !req.body.isbn || !req.body.anoPublicacao) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos' });
    }
    if (req.body.anoPublicacao < 1000 || req.body.anoPublicacao > new Date().getFullYear()) {
      return res.status(400).json({ erro: 'Ano de publicação inválido' });
    }

    const livro = await criarLivro(req.body);
    res.status(201).json(livro);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ erro: 'ISBN já existe' });
    }
    next(error);
  }
};

export const getLivros = async (req: Request, res: Response) => {
  const livros = await listarLivros();
  res.json(livros);
};

export const getLivro = async (req: Request, res: Response, next: NextFunction) => {
  const livro = await buscarLivroPorId(req.params.id);
  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  res.json(livro);
};

export const putLivro = async (req: Request, res: Response, next: NextFunction) => {
  const livro = await atualizarLivro(req.params.id, req.body);
  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  res.json(livro);
};

export const deleteLivro = async (req: Request, res: Response, next: NextFunction) => {
  const sucesso = await deletarLivro(req.params.id);
  if (!sucesso) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  res.status(204).send();
};
