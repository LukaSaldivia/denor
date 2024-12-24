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
.join(TABLES.USUARIO, [["vendedor", "id"]])

MODELS.PEDIDO.insertJoins()
.join(TABLES.CLIENTE, [["cliente", "id"]])

MODELS.PRODUCTO.insertJoins()
.join(TABLES.GRUPO_PRODUCTO, [["grupo", "nombre"]])
.join(TABLES.SECCION_PRODUCTO, [["seccion", "nombre"]])

MODELS.RENGLON_PEDIDO.insertJoins()
.join(TABLES.PEDIDO, [["id_pedido", "id"]])
.join(TABLES.PRODUCTO, [["id_producto", "id"]])

MODELS.ROL_X_PERMISO.insertJoins()
.join(TABLES.ROL, [["id_rol", "nombre"]])
.join(TABLES.PERMISO, [["id_permiso", "nombre"]])

MODELS.USUARIO.insertJoins()
.join(TABLES.ROL, [["rol", "nombre"]])

export default MODELS
