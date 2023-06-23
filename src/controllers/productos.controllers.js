import { pool } from '../db.js'


export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from productos_en_venta');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}
// export const getproductos = (req, res) => res.send("listado de productos");


export const getProducto = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from productos_en_venta where id_producto = ?', id);
        if (rows.length<=0){
            return res.status(400).json({message: "no encontrado"})
        }
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

export const getProductoDetalle = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select p.id_producto id_producto, d.id_detalle id_detalle, p.nombre nombre_producto, tp.nombre tipo_producto, i.id_insumo id_insumo, i.nombre nombre_insumo, ti.nombre tipo_insumo , d.cantidad cantidad, u.abreviacion abreviacion from productos_en_venta p inner join detalle_de_productos d on p.id_producto = d.id_producto inner join insumos i on i.id_insumo = d.id_insumo inner join tipo_de_producto tp on tp.id_tipo_prod = p.id_tipo_prod inner join tipos_de_insumo ti on ti.id_tipo = i.tipo_insumo_id inner join unidades_de_medida u on u.id_unidad = i.unidad_de_medida_id where p.id_producto = ?;', id);
        if (rows.length<=0){
            return res.status(400).json({message: "no encontrado"})
        }
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

export const createProducto = async (req, res) =>{
    const {nombre, descripcion, precio} = req.body
    let sql = 'insert into productos_en_venta(nombre, descripcion, precio) values (?, ?, ?)'
    try {
        const [rows] = await pool.query(sql, [nombre, descripcion, precio])
        res.send(rows)
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
        res.send(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}


export const updateProducto = async (req, res) =>{
    const id = req.params.id;
    const {nombre, descipcion, precio} = req.body
    let sql = 'update productos_en_venta set nombre= ifnull(?, nombre), descripcion= ifnull(?, descripcion), precio= ifnull(?, precio) where id_producto = ?'
    try {
        const [rows] = await pool.query(sql, [nombre, descipcion, precio, id])
        res.send(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}