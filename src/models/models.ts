import TABLES from "./tables.js";

import Model from "./Model.js";

const MODELS = {
  USUARIO : new Model(TABLES.USUARIO),
  CLIENTE : new Model(TABLES.CLIENTE) ,
  PRODUCTO : new Model(TABLES.PRODUCTO),
  RENGLON_PEDIDO : new Model(TABLES.RENGLON_PEDIDO),
  PEDIDO : new Model(TABLES.PEDIDO),
}

// JOINS
MODELS.CLIENTE.insertJoins()
.join(["vendedor"], TABLES.USUARIO, ["id"])

MODELS.PEDIDO.insertJoins()
.join(["cliente"], TABLES.CLIENTE, ["id"])

MODELS.RENGLON_PEDIDO.insertJoins()
.join(["id_pedido"], TABLES.PEDIDO, ["id"])
.join(["id_producto"], TABLES.PRODUCTO, ["id"])

export default MODELS
