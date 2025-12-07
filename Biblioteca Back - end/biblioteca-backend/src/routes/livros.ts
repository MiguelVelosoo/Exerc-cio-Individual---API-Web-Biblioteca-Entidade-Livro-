import { Router } from 'express';
import { postLivro, getLivros, getLivro, putLivro, deleteLivro } from '../controllers/livroController';

const router = Router();

router.post('/api/livros', postLivro);
router.get('/api/livros', getLivros);
router.get('/api/livros/:id', getLivro);
router.put('/api/livros/:id', putLivro);
router.delete('/api/livros/:id', deleteLivro);

export default router;
