export interface BaseEntity {
  id: string
  createdAt?: string
  updatedAt?: string
}

export interface RowData extends BaseEntity {
  [key: string]: unknown
}
