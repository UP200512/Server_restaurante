import { Router} from "express";
import {ping } from '../controllers/index.controllers.js';
const router = Router();
router.get('/', (req, res)=>{
    res.send("hello word en rout");
});

router.get('/ping',ping);

export default router;