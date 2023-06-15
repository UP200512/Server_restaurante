import { Router } from "express";
import { getPedidos, createPedidos, deletePedidos, updatePedidos} from '../controllers/pedidos.controllers.js';

const router = Router();

router.get('/pedidos/:id', getPedidos); //listo

router.post('/pedidos', createPedidos); //listo

router.delete('/pedidos/:id', deletePedidos); //listo

router.patch('/pedidos/:id', updatePedidos); //listo

export default router;