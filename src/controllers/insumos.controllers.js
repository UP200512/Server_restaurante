import { pool } from '../db.js'


export const getInsumos = async (req, res) => {
    try {
        const [rows] = await pool.query('select id_insumo, nombre, tipo_insumo_id, unidad_de_medida_id, descripcion, cantidad from insumos');
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}
// export const getproductos = (req, res) => res.send("listado de productos");


export const GetInsumo = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from insumos where id_insumo = ?', id);
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





export const createInsumo = async (req, res) =>{
    const {nombre, tipo_insumo_id, unidad_de_medida_id, descripcion, cantidad} = req.body
    let sql = 'insert into insumos (nombre, tipo_insumo_id, unidad_de_medida_id, descripcion, cantidad ) values (?, ?, ?, ?, ?)'
    try {
        const [rows] = await pool.query(sql, [nombre, tipo_insumo_id, unidad_de_medida_id, descripcion, cantidad])
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}

export const deleteInsumo = async (req, res) =>{
    // console.log(req.params.id);
    const id = req.params.id;
    let sql = 'delete from insumos where id_insumo = ?'
    try {
        const [rows] = await pool.query(sql, [id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}


export const updateInsumo = async (req, res) =>{
    const id = req.params.id;
    const {nombre, tipo_de_insumo_id, unidad_de_medida_id, descripcion, cantidad} = req.body
    let sql = 'update insumos set nombre = ifnull(?, nombre), tipo_insumo_id= ifnull(?, tipo_insumo_id), unidad_de_medida_id= ifnull(?, unidad_de_medida_id), descripcion=ifnull(?, descripcion), cantidad=ifnull(?, cantidad) where id_insumo = ?'
    try {
        const [rows] = await pool.query(sql, [nombre, tipo_de_insumo_id, unidad_de_medida_id, descripcion, cantidad, id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}