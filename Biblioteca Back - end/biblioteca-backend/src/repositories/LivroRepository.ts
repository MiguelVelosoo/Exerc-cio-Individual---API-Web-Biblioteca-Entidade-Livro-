import { AppDataSource } from '../../data-source';
import { Livro } from '../entities/Livro';

const livroRepository = AppDataSource.getRepository(Livro);

export const criarLivro = async (dados: Partial<Livro>): Promise<Livro> => {
  const livro = livroRepository.create(dados);
  return await livroRepository.save(livro);
};

export const listarLivros = async (): Promise<Livro[]> => {
  return await livroRepository.find();
};

export const buscarLivroPorId = async (id: string): Promise<Livro | null> => {
  return await livroRepository.findOneBy({ id });
};

export const atualizarLivro = async (id: string, dados: Partial<Livro>): Promise<Livro | null> => {
  const livro = await buscarLivroPorId(id);
  if (!livro) return null;
  Object.assign(livro, dados);
  return await livroRepository.save(livro);
};

export const deletarLivro = async (id: string): Promise<boolean> => {
  const livro = await buscarLivroPorId(id);
  if (!livro) return false;
  await livroRepository.remove(livro);
  return true;
};
