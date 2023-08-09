import { Router } from "express";
import { getEmpresa, updateEmpresa } from '../controllers/empresa.controllers.js';
const router = Router();

router.get('/empresa', getEmpresa);
router.patch('/empresa', updateEmpresa);

export default router;