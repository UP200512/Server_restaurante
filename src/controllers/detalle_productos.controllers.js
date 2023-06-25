import { pool } from '../db.js'

export const getDetalleProductos = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from detalle_de_productos where id_detalle = ?', id);
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

export const createDetalleProductos = async (req, res) => {
    const {id_detalle, id_producto, id_insumo, cantidad} = req.body;
    try{
        const [rows] = await pool.query('insert into detalle_de_productos (id_detalle, id_producto, id_insumo, cantidad) select ifnull(MAX(id_detalle), 0) +?, ?, ?, ? from detalle_de_productos where id_producto = 1', [id_detalle, id_producto, id_insumo, cantidad])
        res.send( {
            id_detalle,
            id_producto,
            id_insumo,
            cantidad
        })
    } catch (error){
        return res.status(500).json({ message: 'Algo salio mal' })
    }
}

export const deleteDetalleProductos = async (req, res) =>{
    // console.log(req.params.id);
    const id = req.params.id;
    let sql = 'delete from detalle_de_productos where id_detalle = ?'
    try {
        const [rows] = await pool.query(sql, [id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}

export const updateDetalleProductos = async (req, res) =>{
    const id = req.params.id;
    const {id_insumo, cantidad} = req.body
    let sql = 'update detalle_de_productos set id_insumo=ifnull(?, id_insumo), cantidad=ifnull(?, cantidad) where id_detalle = ?'
    try {
        console.log(id)
        const [rows] = await pool.query(sql, [id_insumo, cantidad, id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}