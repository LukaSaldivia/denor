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

export { Table, FilterOptions }


