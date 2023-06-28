import cors from 'cors';
import express from 'express';
import indexRoutes from './routes/index.routes.js';
import productos from './routes/productos.routes.js';
import tipos_de_usuarios from './routes/tipos_de_usuarios.routes.js';
import insumos from './routes/insumos.routes.js'
import unidades_de_medida from './routes/unidades_de_medida.routes.js';

import productosRoutes from './routes/productos.routes.js';
import detalle_pedidosRoutes from './routes/detalle_pedidos.routes.js'
import detalle_productosRoutes from './routes/detalle_productos.routes.js'
import pedidos from './routes/pedidos.routes.js'
import tipos_de_insumo from './routes/tipos_de_insumo.routes.js'

const app = express();
// const path = require('node:path'); 
//middleware
app.use(express.json());
app.use(cors())


// Hacer que node sirva los archivos de nuestro app React
// app.use(express.static(path.resolve(__dirname, '../client/build')));
//rutas o endPoint
// app.get('/', (request, result) => {
//     result.send({ minuculos: "hello world! npm en el puesto  <br> Hola adios" });
// });

app.get('/hola', (request, result) => {
    // result.json({ minuculos: "hello world! npm en el puesto  <br> Hola adios" });
    result.json({"palabra": "ayer y antier"});
});

app.use(indexRoutes);
app.use('/api', productos);
app.use('/api', tipos_de_usuarios);
app.use('/api', insumos);
app.use('/api', unidades_de_medida);
app.use('/api', productosRoutes);
app.use('/api', detalle_pedidosRoutes);
app.use('/api', detalle_productosRoutes);
app.use('/api', pedidos);
app.use('/api', tipos_de_insumo);

app.use((request, response, next) => {
    response.status(404).json({
        message: "endpoint not found"
    })
});

export default app;