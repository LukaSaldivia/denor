import { Table, Join, Pair } from "../types/MVC-related-types.js";

export default class JoinFactory {
  static createJoin
  <
  AC extends string, 
  BC extends string, 
  BPK extends BC[],
  >
  (
    B: Table<BC, BPK>,
    columns : Pair<AC, BC>[]
  ) : Join<AC, BC, BPK>
  
  {
    return {
      table : B,
      columns
    }
  }
}