import { Table, ForeignKey, Pair } from "../types/MVC-related-types.js";
import ForeignFactoryFactory from "../utils/ForeignKeyFactory.js";


export default class ForeignKeyReferencesGroup<AC extends string> {

  references: ForeignKey<AC, any, any>[] = []


  reference<BC extends string, BPK extends BC[]>
    (
      table: Table<BC, BPK>,
      cols: Pair<AC, BC>[]
    ) {
    this.references.push(ForeignFactoryFactory.createForeignKeyReference(table, cols))

    return this

  }

}