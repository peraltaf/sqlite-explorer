interface DBMetadata {
  filename: string
  version: number
  size: string
  dbname?: string
}

interface TableType {
  type: string
  name: string
  tbl_name: string
  rootpage: number
  sql: string,
  columns?: string[]
  rowCount?: number
  size?: string,
  sampleData?: object[]
}

type Datum = {
  label: string
  rows?: number
  indexes?: number
  columns?: number
}

interface DBInfo {
  metadata: DBMetadata
  data: TableType[]
}

export type { DBMetadata, DBInfo, TableType, Datum }
