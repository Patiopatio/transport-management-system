import type { Table as TableType } from '@tanstack/vue-table'
import type { BaseEntity } from './common'

export interface DataTableProps<TData extends BaseEntity> {
  table: TableType<TData>
}
