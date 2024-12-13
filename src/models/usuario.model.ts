import TableFactory from "../utils/TableFactory.js";
import TextFilter from "../vendor/Filter/TextFilter.js";
import Model from "./Model.js";
let usuarios_table = TableFactory.createTable('usuario', ["id", "nombre", "clave", "creado_en"], ["id"])





let model = new Model(usuarios_table)

let textF = new TextFilter<typeof usuarios_table.columns[number]>('arra', "nombre")

console.log(await model.search([textF]))




export default model