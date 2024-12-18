import { Table, Join } from "../types/MVC-related-types.js";

export default class JoinFactory {
  static createJoin<AC extends string, BC extends string, PK extends BC[], Bkey extends BC[]>(
    AC: AC[],
    B: Table<BC, PK>,
    localKey: Bkey): Join<AC, BC, PK> {
    return { table: B, foreignKey: AC, localKey }
  }
}