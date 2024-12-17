import TableFactory from "../utils/TableFactory.js";
import Model from "./Model.js";
let usuarios_table = TableFactory.createTable('usuario', ["id", "nombre", "clave", "creado_el"], ["id"])

let model = new Model(usuarios_table)

export default model