import TableFactory from "../utils/TableFactory.js";
import Model from "./Model.js";
let usuarios_table = TableFactory.createTable('usuario', ["id", "nombre", "clave", "creado_en"], ["id"])

let model = new Model(usuarios_table)


model.search()
.appendFilter({
  type : "date",
  field : "creado_en",
  value : "2024-7-8",
  score : 20

})
.appendFilter({
  type : "text",
  field : 'nombre',
  value : 'Luka'
})

let results = await model.executeSearch(20)





export default model