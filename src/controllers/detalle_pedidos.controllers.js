import { pool } from "../db.js";
export const getDetallesPedidos = async (req, res) => {
  try {
    // const id=req.params.id;
    const [rows] = await pool.query("select * from detalle_de_pedidos");
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

export const getDetallePedidos = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      "select id_detalle, id_pedido, DATE_FORMAT(fecha, '%Y-%m-%d %T') fecha,  d.id_producto, cantidad, precio_unitario, p.nombre from detalle_de_pedidos d inner join productos_en_venta p on d.id_producto =   p.id_producto where id_pedido = ? order by fecha",
      id
    );
    if (rows.length <= 0) {
      return res.status(200).json(rows);
    }
    // console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

export const createDetallePedidos = async (req, res) => {
  const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
  try {

    const [rows] = await pool.query(
      "insert into detalle_de_pedidos (id_detalle, id_pedido, id_producto, cantidad, precio_unitario) select IFNULL(MAX(id_detalle), 0) + 1, ?, ?, ?, ? from detalle_de_pedidos where id_pedido = ?;",
      [id_pedido, id_producto, cantidad, precio_unitario, id_pedido]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo salio mal", error });
  }
};
export const updateTotal = async (req, res, next) => {
  const { id_pedido, cantidad, precio_unitario } = req.body;
  try {
    const [rows2] = await pool.query(
      "update pedidos SET total=total + ? where id_pedido=?",
      [precio_unitario * cantidad, id_pedido]
    );
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo salio mal", error });
  }
};

export const deleteDetallePedidos = async (req, res) => {
  // console.log(req.params.id);
  const id = req.params.id;
  let sql = "delete from detalle_de_pedidos where id_detalle = ?";
  try {
    const [rows] = await pool.query(sql, [id]);
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};

export const updateDetallePedidos = async (req, res) => {
  const id = req.params.id;
  const { id_producto, cantidad, precio_unitario } = req.body;
  let sql =
    "update detalle_de_pedidos set id_producto = ifnull(?, id_producto), cantidad=ifnull(?, cantidad) , precio_unitario=ifnull(?, precio_unitario) where id_detalle = ?";
  try {
    console.log(id);
    const [rows] = await pool.query(sql, [
      id_producto,
      cantidad,
      precio_unitario,
      id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};
