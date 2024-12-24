import TableFactory from "../utils/TableFactory.js";

export default {
  CLIENTE : TableFactory.createTable('cliente', ["id", "nombre", "vendedor"], ["id"]),
  GRUPO_PRODUCTO : TableFactory.createTable('grupo_producto', ["nombre"], ["nombre"]),
  PEDIDO : TableFactory.createTable('pedido', ["id", "cliente", "pedido_el", "facturado_el"], ["id"]),
  PERMISO : TableFactory.createTable('permiso', ["nombre", "descripcion"], ["nombre"]),
  PRODUCTO : TableFactory.createTable('producto', ["id", "nombre", "grupo", "seccion"], ["id"]),
  RENGLON_PEDIDO : TableFactory.createTable('renglon_pedido', ["id_pedido", "id_producto", "unidades", "bultos", "completado_el", "observaciones"], ["id_pedido", "id_producto"]),
  ROL : TableFactory.createTable('rol', ["nombre", "descripcion"], ["nombre"]),
  ROL_X_PERMISO : TableFactory.createTable('rol_x_permiso', ["id_rol", "id_permiso"], ["id_rol", "id_permiso"]),
  SECCION_PRODUCTO : TableFactory.createTable('seccion_producto', ["nombre"], ["nombre"]),
  USUARIO : TableFactory.createTable('usuario', ["id", "nombre", "clave", "creado_el", "rol"], ["id"]),
}


