import TableFactory from "../utils/TableFactory.js";
import Model from "./Model.js";
let usuarios_table = TableFactory.createTable('usuario', ["id", "nombre", "clave", "creado_el"], ["id"])

let model = new Model(usuarios_table)

model.newSearch()
// .appendFilter({
//   type : 'date',
//   field : 'creado_el',
//   value : '2024-12-12',
//   score : 0
// })
.appendFilter({
  type : 'text',
  field : 'nombre',
  value : 'Luka',
  score : 10
})

console.log(await model.executeSearch())

export default model