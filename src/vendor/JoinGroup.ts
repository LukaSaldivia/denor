import { Table, Join, Pair } from "../types/MVC-related-types.js";
import JoinFactory from "../utils/JoinFactory.js";


export default class JoinGroup<AC extends string> {

  joins: Join<AC, any, any>[] = []


  join<BC extends string, BPK extends BC[]>
    (
      table: Table<BC, BPK>,
      cols: Pair<AC, BC>[]
    ) {
    this.joins.push(JoinFactory.createJoin(table, cols))

    return this

  }

}