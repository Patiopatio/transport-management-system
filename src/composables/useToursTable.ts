import { type ColumnDef, useVueTable, getCoreRowModel } from '@tanstack/vue-table'
import type { Tour } from '@/types/tour'

export function useToursTable(tours: Tour[]) {
  const columns: ColumnDef<Tour>[] = [
    {
      accessorKey: 'customerName',
      header: 'Customer',
    },
    {
      accessorKey: 'shipmentDate',
      header: 'Shipment Date',
    },
    {
      accessorKey: 'locationFrom',
      header: 'From',
    },
    {
      accessorKey: 'locationTo',
      header: 'To',
    },
    {
      accessorKey: 'assignedDriverId',
      header: 'Driver',
      cell: (info) => info.getValue() ?? 'Unassigned',
    },
  ]

  return useVueTable({
    data: tours,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
}
