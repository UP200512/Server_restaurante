import { Router } from "express";
import { getDetalleProductos, createDetalleProductos, deleteDetalleProductos, updateDetalleProductos} from '../controllers/detalle_productos.controllers.js';

const router = Router();

router.get('/detalleProductos/:id', getDetalleProductos); //listo

router.post('/detalleProductos', createDetalleProductos); //listo

router.delete('/detalleProductos/:id', deleteDetalleProductos); //listo

router.patch('/detalleProductos/:id', updateDetalleProductos); //listo

export default router;