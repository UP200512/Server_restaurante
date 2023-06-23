import { Router } from "express";
import { getProductos, getProducto, createProducto, deleteProducto, updateProducto, getProductosbyName} from '../controllers/productos.controllers.js';
const router = Router();

//PRODUCTOS
router.get('/productos', getProductos);
router.get('/producto/:id', getProducto);
router.get('/productos/:nombre', getProductosbyName);
router.post('/productos', createProducto);
router.delete('/productos/:id', deleteProducto);

router.put('/productos/:id', updateProducto); //actualiza todo el registro

export default router;