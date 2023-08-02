import { Router } from "express";
import { getPedido,getPedidos, createPedidos, deletePedidos, updatePedidos, getCuenta, closePedido} from '../controllers/pedidos.controllers.js';

const router = Router();

router.get('/pedidos', getPedidos); //listo

router.get('/pedidos/:id', getPedido); //listo
router.get('/cuenta/:id', getCuenta); //listo

router.post('/pedidos', createPedidos); //listo
router.post('/pedidos/close/:id', closePedido); //listo

router.delete('/pedidos/:id', deletePedidos); //listo

router.patch('/pedidos/:id', updatePedidos); //listo

export default router;