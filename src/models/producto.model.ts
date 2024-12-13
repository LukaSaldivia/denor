import TableFactory from "../utils/TableFactory.js";
import TextFilter from "../vendor/Filter/TextFilter.js";
import Model from "./Model.js";
let productos_table = TableFactory.createTable('producto', ["nombre"], ["nombre"])





let model = new Model(productos_table)

let textF = new TextFilter<typeof productos_table.columns[number]>('arra', "nombre")

console.log(await model.search([textF]))




export default model