import { Router } from "express";
import { getProductos,  getProductosbyName,getProducto, createProducto, createDetalleProducto, deleteProducto, deleteProductoDetalle, updateProducto, updateProductoDetalle, getProductoDetalle } from '../controllers/productos.controllers.js';
const router = Router();

//PRODUCTOS
router.get('/productos', getProductos);
router.get('/producto/:id', getProducto);
router.get('/producto_detalle/:id', getProductoDetalle);

router.get('/productos/:nombre', getProductosbyName);
router.post('/productos', createProducto);
router.post('/producto_detalle', createDetalleProducto);
router.delete('/productos/:id', deleteProducto);
router.delete('/producto_detalle/:idd/:idp', deleteProductoDetalle);

router.patch('/productos/:id', updateProducto); //actualiza todo el registro
router.patch('/producto_detalle/:idd/:idp', updateProductoDetalle);

export default router;