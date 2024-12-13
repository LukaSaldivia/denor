import TableFactory from "../utils/TableFactory.js";
import Model from "./Model.js";
let productos_table = TableFactory.createTable('producto', ["nombre"], ["nombre"])





let model = new Model(productos_table)





export default model