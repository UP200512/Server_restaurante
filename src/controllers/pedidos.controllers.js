import { pool } from '../db.js'

export const getPedidos = async (req, res) => {
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
    const {fecha, total} = req.body;
    try{
        const [rows] = await pool.query('insert into pedidos (fecha, total) values (?,?)', [fecha, total])
        res.send( {
            id: rows.insertId,
            fecha,
            total
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