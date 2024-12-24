import { Table, ForeignKey, Pair } from "../types/MVC-related-types.js";

export default class ForeignKeyFactory {
  static createForeignKeyReference
  <
  AC extends string, 
  BC extends string, 
  BPK extends BC[],
  >
  (
    B: Table<BC, BPK>,
    columns : Pair<AC, BC>[]
  ) : ForeignKey<AC, BC, BPK>
  
  {
    return {
      table : B,
      columns
    }
  }
}