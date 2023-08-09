import { pool } from '../db.js'


export const getTiposDeUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from tipos_de_usuarios');
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}
// export const getproductos = (req, res) => res.send("listado de productos");


export const GetTipoDeUsuario = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from tipos_de_usuarios where id = ?', id);
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





export const createTipoDeUsuario = async (req, res) =>{
    const {nombre} = req.body
    let sql = 'insert into tipos_de_usuarios (nombre) values (?)'
    try {
        const [rows] = await pool.query(sql, [nombre])
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}

export const deleteTipoDeUsuario = async (req, res) =>{
    // console.log(req.params.id);
    const id = req.params.id;
    let sql = 'delete from tipos_de_usuarios where id = ?'
    try {
        const [rows] = await pool.query(sql, [id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}


export const updateTipoDeUsuario = async (req, res) =>{
    const id = req.params.id;
    const {nombre} = req.body
    let sql = 'update tipos_de_usuarios set nombre= ifnull(?, nombre) where id = ?'
    try {
        const [rows] = await pool.query(sql, [nombre, id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}