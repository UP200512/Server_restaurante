import { Router } from "express";
import { getInsumos, GetInsumo, createInsumo, deleteInsumo, updateInsumo } from '../controllers/insumos.controllers.js';
const router = Router();
router.get('/insumos', getInsumos);
router.get('/insumos/:id', GetInsumo);

router.post('/insumos', createInsumo);
router.delete('/insumos/:id', deleteInsumo);

router.patch('/insumos/:id', updateInsumo); //actualiza todo el registro
// router.patch('/productos/:id', updateProducto) //solo una parte

export default router;