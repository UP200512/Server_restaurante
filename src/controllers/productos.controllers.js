import { pool } from '../db.js'


export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from productos_en_venta');
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}
export const getProductosbyName = async (req, res) => {
    let nombre = req.params.nombre
    nombre = '%' + nombre + '%'
    try {
        const [rows] = await pool.query('select * from productos_en_venta where nombre like ?', nombre);
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

export const getProducto = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from productos_en_venta where id_producto = ?', id);
        if (rows.length<=0){
            return res.status(400).json({message: "no encontrado"})
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

export const createProducto = async (req, res) =>{
    const {nombre, descipcion, precio} = req.body
    let sql = 'insert into productos_en_venta(nombre, descripcion, precio) values (?, ?, ?)'
    try {
        const [rows] = await pool.query(sql, [nombre, descipcion, precio])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}

export const deleteProducto = async (req, res) =>{
    // console.log(req.params.id);
    const id = req.params.id;
    let sql = 'delete from productos_en_venta where id_producto = ?'
    try {
        const [rows] = await pool.query(sql, [id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}


export const updateProducto = async (req, res) =>{
    const id = req.params.id;
    const {nombre, descipcion, precio} = req.body
    let sql = 'update productos_en_venta set nombre=ifnull(?, nombre), descripcion=ifnull(?, descripcion), precio=ifnull(?, precio) where id_producto = ?'
    try {
        const [rows] = await pool.query(sql, [nombre, descipcion, precio, id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}