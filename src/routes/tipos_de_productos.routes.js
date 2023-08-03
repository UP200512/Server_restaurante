import { Router } from "express";
import { getTiposProductos, createTiposProductos, deleteTiposProductos, updateTiposProductos, getTipoProductos} from '../controllers/tipos_de_producto.controllers.js';

const router = Router();

router.get('/', getTiposProductos); //listo

router.get('/tiposProductos/:id', getTipoProductos); //listo
router.get('/tiposProductos', getTiposProductos); //listo
router.post('/tiposProductos', createTiposProductos); //listo

router.delete('/tiposProductos/:id', deleteTiposProductos); //listo

router.patch('/tiposProductos/:id', updateTiposProductos); //listo

export default router;