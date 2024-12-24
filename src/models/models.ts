import TABLES from "./tables.js";

import Model from "./Model.js";

const MODELS = {
  CLIENTE : new Model(TABLES.CLIENTE),
  GRUPO_PRODUCTO : new Model(TABLES.GRUPO_PRODUCTO),
  PEDIDO : new Model(TABLES.PEDIDO),
  PERMISO : new Model(TABLES.PERMISO),
  PRODUCTO : new Model(TABLES.PRODUCTO),
  RENGLON_PEDIDO : new Model(TABLES.RENGLON_PEDIDO),
  ROL : new Model(TABLES.ROL),
  ROL_X_PERMISO : new Model(TABLES.ROL_X_PERMISO),
  SECCION_PRODUCTO : new Model(TABLES.SECCION_PRODUCTO),
  USUARIO : new Model(TABLES.USUARIO),
}

// JOINS
MODELS.CLIENTE.insertJoins()
.reference(TABLES.USUARIO, [["vendedor", "id"]])

MODELS.PEDIDO.insertJoins()
.reference(TABLES.CLIENTE, [["cliente", "id"]])

MODELS.PRODUCTO.insertJoins()
.reference(TABLES.GRUPO_PRODUCTO, [["grupo", "nombre"]])
.reference(TABLES.SECCION_PRODUCTO, [["seccion", "nombre"]])

MODELS.RENGLON_PEDIDO.insertJoins()
.reference(TABLES.PEDIDO, [["id_pedido", "id"]])
.reference(TABLES.PRODUCTO, [["id_producto", "id"]])

MODELS.ROL_X_PERMISO.insertJoins()
.reference(TABLES.ROL, [["id_rol", "nombre"]])
.reference(TABLES.PERMISO, [["id_permiso", "nombre"]])

MODELS.USUARIO.insertJoins()
.reference(TABLES.ROL, [["rol", "nombre"]])

export default MODELS
