import { pool } from "../db.js";

export const getPagosById = async (req, res) => {
    try {
        const [rows] = await pool.query("select id_pedido, DATE_FORMAT(fecha, '%Y-%m-%d %T') as fecha, total, mesa, activo from pedidos where activo=true order by id_pedido desc");
        // if (rows.length<=0){
        //     return res.status(400).json({message: "no encontrado"})
        // }
        res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

// export const getCuenta = async (req, res) => {
//     try {
//         const id=req.params.id;
//         const [rows] = await pool.query("select  p.nombre, id_pedido, d.id_producto, sum(cantidad) as cantidad, precio_unitario, sum(cantidad)*precio_unitario as total from detalle_de_pedidos d inner join productos_en_venta p on d.id_producto=p.id_producto where id_pedido=? group by id_producto;", id);
//         // if (rows.length<=0){
//         //     return res.status(400).json({message: "no encontrado"})
//         // }
//         res.status(200).json(rows);
//     } catch (error) {
//         return res.status(500).json({
//             message: "something went wrong"
//         });
//     }
// }

// export const getPedido = async (req, res) => {
//     try {
//         const id=req.params.id;
//         const [rows] = await pool.query('select * from pedidos where id_pedido = ?', id);
//         if (rows.length<=0){
//             return res.status(400).json({message: "no encontrado"})
//         }
//         res.status(200).json(rows[0]);
//     } catch (error) {
//         return res.status(500).json({
//             message: "something went wrong"
//         });
//     }
// }

export const createPagos = async (req, res) => {
  const { id_pedido, productos, tipo } = req.body; // 'productos' es un array con información de los productos a pagar
//   let total = 0;
let tipo2=null
  if(tipo.length>0){
    tipo2=tipo
  }
  try {
    // Obtener el último id_pago insertado
    const [lastIdResult] = await pool.query(
      `SELECT IFNULL(MAX(id_pago), 0) as lastId FROM pagos`
    );
    let lastId = lastIdResult[0].lastId;
    lastId++;
    // Crear una cadena de valores para la inserción múltiple
    let values = "";
    productos.forEach((producto, index) => {
      const { id_producto, cantidad, precio_unitario } = producto;
      const subtotal = cantidad * precio_unitario;
    //   total += subtotal;

      // Generar un nuevo id_pago para cada producto en el pedido
      
      values += `(${lastId}, ${id_pedido}, ${id_producto}, ${cantidad}, ${precio_unitario}, ${subtotal}, '${tipo2}')`;

      if (index !== productos.length - 1) {
        values += ", ";
      }
    });

    // Ejecutar la consulta para insertar múltiples registros en una sola operación
    const query = `INSERT INTO pagos (id_pago, id_pedido, id_producto, cantidad, precio_unitario, total, tipo) VALUES ${values}`;
    const [result] = await pool.query(query);
    // console.log(result)
    res.status(200).send(result); // En caso de que necesites los IDs generados
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

// export const deletePedidos = async (req, res) =>{
//     // console.log(req.params.id);
//     const id = req.params.id;
//     let sql = 'delete from pedidos where id_pedido = ?'
//     try {
//         const [rows] = await pool.query(sql, [id])
//         res.status(200).json(rows)
//     } catch (error) {
//         return res.status(500).json({message: 'Algo va mal'})
//     }
// }

// export const updatePedidos = async (req, res) =>{
//     const id = req.params.id;
//     const {fecha, total} = req.body
//     let sql = 'update pedidos set fecha=ifnull(?, fecha), total=ifnull(?,total) where id_pedido = ?'
//     try {
//         console.log(id)
//         const [rows] = await pool.query(sql, [fecha, total, id])
//         res.status(200).json(rows)
//     } catch (error) {
//         return res.status(500).json({message: 'Algo va mal'})
//     }
// }
