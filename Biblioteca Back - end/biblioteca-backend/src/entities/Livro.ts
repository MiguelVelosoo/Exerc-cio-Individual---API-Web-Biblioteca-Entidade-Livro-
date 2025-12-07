import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('livros')
export class Livro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  titulo: string;

  @Column({ length: 255 })
  autor: string;

  @Column({ unique: true, length: 13 })
  isbn: string;

  @Column('int')
  anoPublicacao: number;

  @Column({ default: true })
  disponivel: boolean;
}
