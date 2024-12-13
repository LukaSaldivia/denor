import TableFactory from "../utils/TableFactory.js";
import TextFilter from "../vendor/Filter/TextFilter.js";
import Model from "./Model.js";

let roles_table = TableFactory.createTable('rol', ["lala", "pepe", "luka"], ["luka"])


let model = new Model(roles_table)