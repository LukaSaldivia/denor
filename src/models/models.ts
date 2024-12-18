import TABLES from "./tables.js";

import Model from "./Model.js";

const MODELS = {
  USUARIO : new Model(TABLES.USUARIO),
  CLIENTE : new Model(TABLES.CLIENTE) 
}

// JOINS
MODELS.CLIENTE.insertJoins().join(["vendedor"], TABLES.USUARIO, ["id"])

export default MODELS
