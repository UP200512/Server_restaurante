import { Router } from "express";
import { getProductos, getProducto, createProducto, deleteProducto, updateProducto, getProductoDetalle } from '../controllers/productos.controllers.js';
const router = Router();
router.get('/productos', getProductos);
router.get('/producto/:id', getProducto);
router.get('/producto_detalle/:id', getProductoDetalle);

router.post('/productos', createProducto);
router.delete('/productos/:id', deleteProducto);

router.patch('/productos/:id', updateProducto); //actualiza todo el registro
// router.patch('/productos/:id', updateProducto) //solo una parte

export default router;