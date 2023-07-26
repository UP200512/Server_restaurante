import { pool } from '../db.js'
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { ValidatePassword, encryptPassword } from '../funciones/usuarios.funciones.js';

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
    let {nombre, tipo, email, clave} = req.body
    let sql = 'insert into usuarios (nombre, email, clave ) values (?, ?, ?)'
    clave=encryptPassword(clave)
    try {
        
        const [rows] = await pool.query(sql, [nombre, email, clave])
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal', codigo: error.message})
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
// export const login = async (req, res) => {
//     try {
//       const { email, clave } = req.body;
//       const sql = "select clave from usuarios where email = ?";
//       const [rows] = await pool.query(sql, [email]);
//       const EcPassword = rows[0].clave;
//       // res.send(rows);
//       if (ValidatePassword(EcPassword, clave)) {
        
//         let token =jwt.sign({email}, SECRET,{
//           expiresIn: "7d"
//         })
//         res.status(200).json({auth: true, token});
//       } else res.json({auth: false, message:"login incorrectamente"});
//     } catch {
//       return res.status(500).json({ message: "Algo va mal" });
//     }
//   };