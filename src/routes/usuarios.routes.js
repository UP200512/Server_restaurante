import { Router } from "express";
import { getUsuarios, GetUsuario, createUsuario, deleteUsuario, updateUsuario } from '../controllers/usuarios.controllers.js';
const router = Router();
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', GetUsuario);

router.post('/usuarios', createUsuario);
// router.delete('/tipos_de_usuarios/:id', deleteUsuario);

// router.patch('/tipos_de_usuarios/:id', updateUsuario); //actualiza todo el registro
// router.patch('/productos/:id', updateProducto) //solo una parte

export default router;