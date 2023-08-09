import { Router } from "express";
import { getTiposDeUsuarios, GetTipoDeUsuario, createTipoDeUsuario, deleteTipoDeUsuario, updateTipoDeUsuario } from '../controllers/tipos_de_usuarios.controllers.js';
const router = Router();
router.get('/tipos_de_usuarios', getTiposDeUsuarios);
router.get('/tipos_de_usuarios/:id', GetTipoDeUsuario);

router.post('/tipos_de_usuarios', createTipoDeUsuario);
router.delete('/tipos_de_usuarios/:id', deleteTipoDeUsuario);

router.patch('/tipos_de_usuarios/:id', updateTipoDeUsuario); //actualiza todo el registro
// router.patch('/productos/:id', updateProducto) //solo una parte

export default router;