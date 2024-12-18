import TableFactory from "../utils/TableFactory.js";

export default {
  USUARIO : TableFactory.createTable('usuario', ["id", "nombre", "clave", "creado_el"], ["id"]),
  CLIENTE : TableFactory.createTable('cliente', ["id", "nombre", "vendedor"], ["id"]),
  PRODUCTO : TableFactory.createTable('producto', ["id", "nombre", "grupo", "seccion"], ["id"]),
  RENGLON_PEDIDO : TableFactory.createTable('renglon_pedido', ["id_pedido", "id_producto", "unidades", "bultos", "completado_el", "observaciones"], ["id_pedido", "id_producto"]),
  PEDIDO : TableFactory.createTable('pedido', ["id", "cliente", "pedido_el", "facturado_el"], ["id"])
}


