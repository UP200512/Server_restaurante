import { Router } from "express";
import { getTiposInsumo, createTiposInsumo, deleteTiposInsumo, updateTiposInsumo, getTiposInsumos} from '../controllers/tipos_de_insumo.controllers.js';

const router = Router();

router.get('/tiposInsumos', getTiposInsumos); //listo

router.get('/tiposInsumo/:id', getTiposInsumo); //listo
router.get('/tiposInsumo', getTiposInsumos); //listo
router.post('/tiposInsumo', createTiposInsumo); //listo

router.delete('/tiposInsumo/:id', deleteTiposInsumo); //listo

router.patch('/tiposInsumo/:id', updateTiposInsumo); //listo

export default router;