import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
// import { ValidatePassword, encryptPassword } from '../funciones/usuarios.funciones.js';

export function ValidatePassword(passwordEN, password) {
  // console.log(bcrypt.compareSync(password, passwordEN));
  return bcrypt.compareSync(password, passwordEN);
}

export const login = async (req, res) => {
  try {
    const { email, clave } = req.body;
    const sql = "select clave from usuarios where email = ?";
    const [rows] = await pool.query(sql, [email]);
    const EcPassword = rows[0].clave;
    // res.send(rows);
    if (ValidatePassword(EcPassword, clave)) {
      let token = jwt.sign({ email }, SECRET, {
        expiresIn: "7d",
      });
      res.status(200).json({ auth: true, token });
    } else res.json({ auth: false, message: "login incorrectamente" });
  } catch {
    return res.status(500).json({ message: "Algo va mal" });
  }
};

export const validarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
 // Extraer el token de la cabecera 'Authorization'

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token." });
  }

  jwt.verify(token, SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Token inválido o expirado." });
    }

    // Si el token es válido, puedes acceder a la información decodificada.
    req.user = decoded;
    next();
  });
};
