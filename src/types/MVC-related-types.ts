type Table<C extends string, PK extends C[]> = {
  table_name : string
  columns : C[]
  primary_key : PK
}

export { Table }


