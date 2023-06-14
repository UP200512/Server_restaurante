import express from 'express';
import indexRoutes from './routes/index.routes.js';
import productos from './routes/productos.routes.js';
import tipos_de_usuarios from './routes/tipos_de_usuarios.routes.js';
import insumos from './routes/insumos.routes.js'
import unidades_de_medida from './routes/unidades_de_medida.routes.js';
const app = express();
// const path = require('node:path'); 
//middleware
app.use(express.json());

// Hacer que node sirva los archivos de nuestro app React
// app.use(express.static(path.resolve(__dirname, '../client/build')));
//rutas o endPoint
// app.get('/', (request, result) => {
//     result.send({ minuculos: "hello world! npm en el puesto  <br> Hola adios" });
// });

app.get('/hola', (request, result) => {
    // result.json({ minuculos: "hello world! npm en el puesto  <br> Hola adios" });
    result.json({
        "message": "hola putos"
    });
});

app.use(indexRoutes);
app.use('/api', productos);
app.use('/api', tipos_de_usuarios);
app.use('/api', insumos);
app.use('/api', unidades_de_medida);

app.use((request, response, next) => {
    response.status(404).json({
        message: "endpoint not found"
    })
});

export default app;