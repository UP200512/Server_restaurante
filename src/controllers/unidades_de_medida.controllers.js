import { pool } from '../db.js'


export const getUnidades = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from unidades_de_medida');
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}
// export const getproductos = (req, res) => res.send("listado de productos");


export const GetUnidad = async (req, res) => {
    try {
        const id=req.params.id;
        const [rows] = await pool.query('select * from unidades_de_medida where id_unidad = ?', id);
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





export const createUnidad = async (req, res) =>{
    const {nombre, abreviacion} = req.body
    let sql = 'insert into unidades_de_medida (nombre, abreviacion ) values (?, ?)'
    try {
        const [rows] = await pool.query(sql, [nombre, abreviacion])
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}

export const deleteUnidad = async (req, res) =>{
    // console.log(req.params.id);
    const id = req.params.id;
    let sql = 'delete from unidades_de_medida where id_unidad = ?'
    try {
        const [rows] = await pool.query(sql, [id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}


export const updateUnidad = async (req, res) =>{
    // console.log("hola")
    const id = req.params.id;
    const {nombre, abreviacion} = req.body
    
    let sql = 'update unidades_de_medida set nombre = ifnull(?, nombre), abreviacion= ifnull(?, abreviacion) where id_unidad = ?'
    try {
        const [rows] = await pool.query(sql, [nombre, abreviacion, id])
        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: 'Algo va mal'})
    }
}