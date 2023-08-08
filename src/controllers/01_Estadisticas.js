import { pool } from "../db.js";
export const getLastMax = async (req, res) => {
  try {
    // const id=req.params.id;
    const [rows] = await pool.query("SELECT p.nombre AS nombre, p.precio as precio_actual, SUM(dp.cantidad) AS total_vendido, SUM(dp.cantidad * dp.precio_unitario) AS Ingresos FROM detalle_de_pedidos dp INNER JOIN productos_en_venta p ON dp.id_producto = p.id_producto WHERE dp.fecha >= DATE_SUB(NOW(), INTERVAL 2 WEEK) AND dp.fecha < NOW() group by nombre  order by total_vendido desc limit 5");
    if (rows.length <= 0) {
      return res.status(400).json({ message: "no encontrado" });
    }
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};
