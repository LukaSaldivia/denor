import TableFactory from "../utils/TableFactory.js";

export default {
  USUARIO : TableFactory.createTable('usuario', ["id", "nombre", "clave", "creado_el"], ["id"]),
  CLIENTE : TableFactory.createTable('cliente', ["id", "nombre", "vendedor"], ["id"])
}


