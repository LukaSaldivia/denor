import { Table, Join } from "../types/MVC-related-types.js";
import JoinFactory from "../utils/JoinFactory.js";


export default class JoinGroup<AC extends string> {

  joins: Join<AC, any, any>[] = []

  join<Akey extends AC, BC extends string, PK extends BC[], Bkey extends BC[]>(
    foreignKey: Akey[], table: Table<BC, PK>, localKey: Bkey) {
    this.joins.push(JoinFactory.createJoin(foreignKey, table, localKey))
    return this
  }

}