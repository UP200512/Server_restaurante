import { pool } from '../db.js'

export const getTiposInsumo = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from tipos_de_insumo where id_tipo = ?', id);
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

export const createTiposInsumo = async (req, res) => {
    const {nombre} = req.body;
    try{
        const [rows] = await pool.query('insert into tipos_de_insumo (nombre) values (?)', [nombre])
        res.send( {
            id: rows.insertId,
            nombre
        })
    } catch (error){
        return res.status(500).json({ message: 'Algo salio mal' })
    }
}

export const deleteTiposInsumo = async (req, res) =>{
    // console.log(req.params.id);
    const id = req.params.id;
    let sql = 'delete from tipos_de_insumo where id_tipo = ?'
    try {
        const [rows] = await pool.query(sql, [id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}

export const updateTiposInsumo = async (req, res) =>{
    const id = req.params.id;
    const {nombre} = req.body
    let sql = 'update tipos_de_insumo set nombre=ifnull(?, nombre) where id_tipo = ?'
    try {
        console.log(id)
        const [rows] = await pool.query(sql, [nombre, id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}