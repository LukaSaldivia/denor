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
.join(TABLES.USUARIO, [["vendedor", "id"]])

MODELS.PEDIDO.insertJoins()
.join(TABLES.CLIENTE, [["cliente", "id"]])

MODELS.RENGLON_PEDIDO.insertJoins()
.join(TABLES.PEDIDO, [["id_pedido", "id"]])
.join(TABLES.PRODUCTO, [["id_producto", "id"]])

export default MODELS
