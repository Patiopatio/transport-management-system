import { type ColumnDef, useVueTable, getCoreRowModel } from '@tanstack/vue-table'
import type { BaseEntity } from '@/types/common'
import { computed, type ComputedRef } from 'vue'

export interface DataTableOptions<T extends BaseEntity> {
  data: T[] | ComputedRef<T[]>
  columns: ColumnDef<T>[]
  filters?: {
    searchQuery?: string
    searchFields?: (keyof T)[]
    dateField?: keyof T
    dateValue?: string
  }
}

export function useDataTable<T extends BaseEntity>({
  data,
  columns,
  filters,
}: DataTableOptions<T>) {
  const sourceData = computed(() => {
    return Array.isArray(data) ? data : data.value
  })

  const filteredData = computed(() => {
    let filtered = [...sourceData.value]

    if (filters?.searchQuery && filters.searchFields) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter((item) =>
        filters.searchFields?.some((field) => String(item[field]).toLowerCase().includes(query)),
      )
    }

    if (filters?.dateField && filters.dateValue) {
      filtered = filtered.filter((item) => String(item[filters.dateField!]) === filters.dateValue)
    }

    return filtered
  })

  const table = useVueTable({
    get data() {
      return filteredData.value
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    table,
    filteredData,
  }
}
