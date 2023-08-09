import { Router } from "express";
import { getLastMax } from "../controllers/01_Estadisticas.js";
import { getOneMax } from "../controllers/01_Estadisticas.js";
import { getPorcentaje } from "../controllers/01_Estadisticas.js";
const router = Router();
router.get('/estadisticas/lastmax', getLastMax); //listo
router.get('/estadisticas/OneMax', getOneMax);
router.get('/estadisticas/Porcentaje', getPorcentaje);
export default router;