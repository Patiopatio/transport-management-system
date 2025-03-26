<template>
  <div class="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead v-for="column in table.getAllColumns()" :key="column.id">
            {{ column.columnDef.header }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
          <TableCell v-for="cell in row.getAllCells()" :key="cell.id">
            <slot :name="`cell-${cell.column.id}`" :row="row" :cell="cell">
              {{ cell.renderValue() }}
            </slot>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts" generic="T extends BaseEntity">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { DataTableProps } from '@/types/table'
import type { BaseEntity } from '@/types/common'

defineProps<DataTableProps<T>>()
</script>
