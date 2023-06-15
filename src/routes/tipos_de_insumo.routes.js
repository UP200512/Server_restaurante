import { Router } from "express";
import { getTiposInsumo, createTiposInsumo, deleteTiposInsumo, updateTiposInsumo} from '../controllers/tipos_de_insumo.controllers.js';

const router = Router();

router.get('/tiposInsumo/:id', getTiposInsumo); //listo

router.post('/tiposInsumo', createTiposInsumo); //listo

router.delete('/tiposInsumo/:id', deleteTiposInsumo); //listo

router.patch('/tiposInsumo/:id', updateTiposInsumo); //listo

export default router;