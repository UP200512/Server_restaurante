import { Router } from "express";
import { getDetallePedidos, createDetallePedidos, deleteDetallePedidos, updateDetallePedidos, getDetallesPedidos, updateTotal} from '../controllers/detalle_pedidos.controllers.js';

const router = Router();

// DETALLE DE PEDIDOS
router.get('/detallePedidos/', getDetallesPedidos); //listo
router.get('/detallePedidos/:id', getDetallePedidos); //listo

router.post('/detallePedidos', updateTotal, createDetallePedidos); //listo

router.delete('/detallePedidos/:id', deleteDetallePedidos); //listo

router.patch('/detallePedidos/:id', updateDetallePedidos); //listo

export default router;