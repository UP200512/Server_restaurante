import { pool } from '../db.js'

export const getEmpresa = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from empresa');
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

export const updateEmpresa = async (req, res) => {
    //const id = req.params.id;
    const { nombre, calle, numero, telefono, localidad, estado, correo } = req.body

    try {
        let sql = 'update empresa set nombre=ifnull(?, nombre), calle=ifnull(?, calle), numero=ifnull(?, numero), localidad=ifnull(?, localidad), estado=ifnull(?, estado), telefono=ifnull(?, telefono), correo=ifnull(?, correo) where id = 1;';
        const [rows] = await pool.query(sql, [nombre, calle, numero, localidad, estado, telefono, correo]);
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Algo va mal' });
    }
};