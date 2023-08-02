import { Router } from "express";
import {  createPagos} from '../controllers/pagos.controllers.js';

const router = Router();

// router.get('/pagos', getPagos); //listo

// router.get('/pagos/:id', getPago); //listo
// router.get('/pagos/:id', getCuenta); //listo

router.post('/pagos', createPagos); //listo

// router.delete('/pagos/:id', deletepagos); //listo

// router.patch('/pagos/:id', updatepagos); //listo

export default router;