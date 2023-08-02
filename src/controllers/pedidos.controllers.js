import { pool } from '../db.js'

export const getPedidos = async (req, res) => {
    try {
        const [rows] = await pool.query("select id_pedido, DATE_FORMAT(fecha, '%Y-%m-%d %T') as fecha, total, mesa, activo from pedidos where activo=true order by id_pedido desc");
        // if (rows.length<=0){
        //     return res.status(400).json({message: "no encontrado"})
        // }
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

export const closePedido = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query("update pedidos set activo= false where id_pedido=?", id);
        // if (rows.length<=0){
        //     return res.status(400).json({message: "no encontrado"})
        // }
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}




export const getCuenta = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query("select  p.nombre, d.id_pedido, d.id_producto, sum(cantidad) - ifnull((select sum(cantidad) from pagos pa where pa.id_pedido= d.id_pedido and d.id_producto= pa.id_producto group by pa.id_producto ), 0) as cantidad, precio_unitario, (sum(cantidad)  - ifnull((select sum(cantidad) from pagos pa where pa.id_pedido= d.id_pedido and d.id_producto= pa.id_producto group by pa.id_producto ),0))*precio_unitario as total from detalle_de_pedidos d inner join productos_en_venta p on d.id_producto=p.id_producto where id_pedido= ? group by id_producto HAVING cantidad > 0", id);
        // if (rows.length<=0){
        //     return res.status(400).json({message: "no encontrado"})
        // }
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}


export const getPedido = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from pedidos where id_pedido = ?', id);
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

export const createPedidos = async (req, res) => {
    const {fecha, total, mesa} = req.body;
    try{
        const [rows] = await pool.query('insert into pedidos (mesa) values ( ?)', [ mesa])
        res.send( {
            id: rows.insertId,
            
        })
    } catch (error){
        return res.status(500).json({ message: 'Algo salio mal' })
    }
}

export const deletePedidos = async (req, res) =>{
    // console.log(req.params.id);
    const id = req.params.id;
    let sql = 'delete from pedidos where id_pedido = ?'
    try {
        const [rows] = await pool.query(sql, [id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}

export const updatePedidos = async (req, res) =>{
    const id = req.params.id;
    const {fecha, total} = req.body
    let sql = 'update pedidos set fecha=ifnull(?, fecha), total=ifnull(?,total) where id_pedido = ?'
    try {
        console.log(id)
        const [rows] = await pool.query(sql, [fecha, total, id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}