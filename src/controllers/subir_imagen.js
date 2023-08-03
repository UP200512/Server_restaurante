import fs from 'fs';
import path, { dirname } from 'path';
import multer from 'multer';
import { Router } from "express";
import { pool } from '../db.js';
import { fileURLToPath } from 'url';

//const multer = require('multer');
//const path = require('path');
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
console.log(__filename);


const storage = multer.diskStorage({
    //destination: '../Server_restaurante/src/images/temporal',
    destination: './src/images/temporal',
    filename: (req, file, cb) => {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        //const extension = path.extname(file.originalname);
        //cb(null, file.fieldname + '-' + uniqueSuffix + extension);
        //const nombreArchivo = req.body.id + path.extname(file.originalname);
        const nombreArchivo = path.extname(file.originalname);
        cb(null, nombreArchivo);
    }
});

const upload = multer({ storage: storage });

router.post('/subirImagen', upload.single('image'), async (req, res) => {
    // Aquí, req.file contiene la información del archivo subido, y req.file.path es la ruta temporal en el servidor.

    const id = req.body.id;
    const nombre = id + req.file.filename;
    //const nuevaRuta = path.join('../Server_restaurante/src/images/images', nombre);
    const nuevaRuta = path.join('./src/images/images', nombre);

    console.log(id);
    console.log(nombre);

    // Mover el archivo a la nueva ubicación de forma permanente.
    fs.rename(req.file.path, nuevaRuta, async (err) => {
        console.log(req.file.path);
        if (err) {
            // En caso de error al mover el archivo, enviamos una respuesta de error al cliente.
            console.error('Error al mover la imagen:', err);
            res.status(500).json({ error: 'Ocurrió un error al guardar la imagen.' });
        } else {

            let sql = 'update productos_en_venta set imagen = ? where id_producto = ?;'
            try {
                const [rows] = await pool.query(sql, [nombre, id]);
                //res.status(200).json(rows)
            } catch (error) {
                return res.status(500).json({ message: "Error en la base de datos" });
            }

            // Si no hay errores, enviamos una respuesta de éxito al cliente.
            res.status(200).json({ message: 'Imagen subida y guardada con éxito.' });
        }
    });
});


export default router;