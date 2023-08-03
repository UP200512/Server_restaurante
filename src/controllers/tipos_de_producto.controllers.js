import { pool } from "../db.js";

export const getTiposProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from tipo_de_producto;');
        if (rows.length<=0){
            return res.status(400).json({message: "no encontrado"})
        }
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

export const getTiposProductosMaxId = async (req, res) => {
  try {
      const [rows] = await pool.query('select max(id_tipo_prod) max_id from tipo_de_producto;');
      if (rows.length<=0){
          return res.status(400).json({message: "no encontrado"})
      }
      res.status(200).json(rows);
  } catch (error) {
      return res.status(500).json({
          message: "something went wrong"
      });
  }
}

export const getTipoProductos = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      "select * from tipo_de_producto where id_tipo_prod = ?",
      id
    );
    if (rows.length <= 0) {
      return res.status(400).json({ message: "no encontrado" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

export const createTiposProductos = async (req, res) => {
  const { nombre } = req.body;
  try {
    const [rows] = await pool.query(
      "insert into tipo_de_producto (nombre) values (?)",
      [nombre]
    );
    res.send({
      id: rows.insertId,
      nombre,
    });
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal" });
  }
};

export const deleteTiposProductos = async (req, res) => {
  // console.log(req.params.id);
  const id = req.params.id;
  let sql = "delete from tipo_de_producto where id_tipo_prod = ?";
  try {
    const [rows] = await pool.query(sql, [id]);
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};

export const updateTiposProductos = async (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;
  let sql =
    "update tipo_de_producto set nombre=ifnull(?, nombre) where id_tipo_prod = ?";
  try {
    const [rows] = await pool.query(sql, [nombre, id]);
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};
