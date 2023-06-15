import { Router } from "express";
import { getDetallePedidos, createDetallePedidos, deleteDetallePedidos, updateDetallePedidos} from '../controllers/detalle_pedidos.controllers.js';

const router = Router();

// DETALLE DE PEDIDOS
router.get('/detallePedidos/:id', getDetallePedidos); //listo

router.post('/detallePedidos', createDetallePedidos); //listo

router.delete('/detallePedidos/:id', deleteDetallePedidos); //listo

router.patch('/detallePedidos/:id', updateDetallePedidos); //listo

export default router;