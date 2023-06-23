import { pool } from '../db.js'

export const getDetallePedidos = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from detalle_de_pedidos where id_pedido = ?', id);
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

export const createDetallePedidos = async (req, res) => {
    const {id_detalle, id_pedido, id_producto, cantidad, precio_unitario} = req.body;
    try{
        const [rows] = await pool.query('insert into detalle_de_pedidos (id_detalle, id_pedido, id_producto, cantidad, precio_unitario) select IFNULL(MAX(id_detalle), 0) + ?, ?, ?, ?, ? from detalle_de_pedidos where id_pedido = ?;', [id_detalle, id_pedido, id_producto, cantidad, precio_unitario, id_pedido])
        res.status(200).json( {
            id_detalle,
            id_pedido,
            id_producto,
            cantidad,
            precio_unitario,
            id_pedido
        })
    } catch (error){
        return res.status(500).json({ message: 'Algo salio mal' })
    }
}

export const deleteDetallePedidos= async (req, res) =>{
    // console.log(req.params.id);
    const id = req.params.id;
    let sql = 'delete from detalle_de_pedidos where id_detalle = ?'
    try {
        const [rows] = await pool.query(sql, [id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}

export const updateDetallePedidos = async (req, res) =>{
    const id = req.params.id;
    const {id_producto, cantidad, precio_unitario} = req.body
    let sql = 'update detalle_de_pedidos set id_producto = ifnull(?, id_producto), cantidad=ifnull(?, cantidad) , precio_unitario=ifnull(?, precio_unitario) where id_detalle = ?'
    try {
        console.log(id)
        const [rows] = await pool.query(sql, [id_producto, cantidad, precio_unitario, id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}
