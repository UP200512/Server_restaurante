import { pool } from '../db.js'


export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from usuarios');
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}
// export const getproductos = (req, res) => res.send("listado de productos");


export const GetUsuario = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from usuarios where id = ?', id);
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





export const createUsuario = async (req, res) =>{
    const {nombre, id_tipo_de_usuario, correo, clave} = req.body
    let sql = 'insert into usuarios (nombre, id_tipo_usuario, correo, clave ) values (?, ?, ?, ?)'
    try {
        const [rows] = await pool.query(sql, [nombre, id_tipo_de_usuario, correo, clave])
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}

export const deleteUsuario= async (req, res) =>{
    // console.log(req.params.id);
    const id = req.params.id;
    let sql = 'delete from usuarios where id = ?'
    try {
        const [rows] = await pool.query(sql, [id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}


export const updateUsuario = async (req, res) =>{
    // console.log("hola")
    const id = req.params.id;
    const {nombre, abreviacion} = req.body
    
    let sql = 'update usuario set nombre = ifnull(?, nombre), id_tipo_usuario= ifnull(?, id_tipo_usuario), correo= ifnull(?, correo), clave= ifnull(?, clave) where id = ?'
    try {
        const [rows] = await pool.query(sql, [nombre, abreviacion, id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}