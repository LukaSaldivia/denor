import { Table } from "../types/MVC-related-types";

export default class TableFactory {
  static createTable<C extends string, PK extends C[]>(
    table_name: string,
    columns: C[],
    primary_key: PK
  ): Table<C, PK> {
    return { table_name, columns, primary_key };
  }
}
