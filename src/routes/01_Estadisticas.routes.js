import { Router } from "express";
import { getLastMax } from "../controllers/01_Estadisticas.js";
const router = Router();
router.get('/estadisticas/lastmax', getLastMax); //listo
export default router;