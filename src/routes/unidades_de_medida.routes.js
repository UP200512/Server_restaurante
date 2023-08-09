import { Router } from "express";
import { getUnidades, GetUnidad, createUnidad, deleteUnidad, updateUnidad} from '../controllers/unidades_de_medida.controllers.js';
const router = Router();
router.get('/unidades_de_medida', getUnidades);
router.get('/unidades_de_medida/:id', GetUnidad);

router.post('/unidades_de_medida', createUnidad);
router.delete('/unidades_de_medida/:id', deleteUnidad);

router.patch('/unidades_de_medida/:id', updateUnidad); //actualiza todo el registro
// router.patch('/productos/:id', updateProducto) //solo una parte

export default router;