type Table<C extends string, PK extends C[]> = {
  table_name: string
  columns: C[]
  primary_key: PK
}

type FilterOptions<C extends string> = {
  field: C
  score? : number
} & (
    {
      type: 'range'
      min: number | string
      max: number | string
    } | {
      type: 'number'
      value: number
    } | {
      type: 'text' | 'date' | 'stricttext'
      value: string
    }

  )

type ForeignKey<AC extends string, BC extends string, PK extends BC[]> = {
  table : Table<BC,PK>,
  columns : Pair<AC, BC>[]
}

type Pair<AC extends string, BC extends string> = [AC, BC]

export { Table, FilterOptions, ForeignKey, Pair }


