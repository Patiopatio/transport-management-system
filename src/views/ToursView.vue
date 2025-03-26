<template>
  <div class="container mx-auto py-10">
    <div class="flex flex-col md:flex-row justify-between items:start md:items-center mb-6">
      <h1 class="text-2xl font-bold mb-6">Tours</h1>
      <div class="flex gap-2">
        <TourFormModal ref="tourModalRef" :selected-tour="selectedTour" @close="handleModalClose" />
        <Button variant="outline" @click="handleReset">Reset Filters</Button>
      </div>
    </div>

    <div class="flex gap-4 mb-6">
      <Input
        v-model="filters.searchQuery"
        placeholder="Search by location..."
        class="max-w-sm"
        @input="handleSearch"
      />
      <Input
        v-model="filters.dateFilter"
        type="date"
        class="max-w-sm"
        @input="handleDateFilter"
        :class="{ 'border-primary': filters.dateFilter }"
      />
    </div>

    <DataTable :table="table">
      <template #cell-assignedDriverId="{ row }">
        <div class="relative">
          <Combobox v-model="row.original.assignedDriverId">
            <ComboboxAnchor>
              <div class="relative w-full items-center">
                <ComboboxInput
                  :display-value="() => getDriverName(row.original.assignedDriverId ?? null)"
                  placeholder="Select driver..."
                />
                <ComboboxTrigger
                  class="absolute end-0 inset-y-0 flex items-center justify-center px-3"
                >
                  <ChevronsUpDown class="size-4 text-muted-foreground" />
                </ComboboxTrigger>
              </div>
            </ComboboxAnchor>
            <ComboboxList>
              <ComboboxEmpty>No matching drivers</ComboboxEmpty>
              <ComboboxGroup>
                <ComboboxItem
                  v-for="driver in getAvailableDrivers(row.original.locationFrom)"
                  :key="driver.id"
                  :value="driver.id"
                  @select="handleDriverAssign(row.original.id, driver.id)"
                >
                  {{ driver.name }}
                  <ComboboxItemIndicator>
                    <Check class="ml-auto h-4 w-4" />
                  </ComboboxItemIndicator>
                </ComboboxItem>
              </ComboboxGroup>
            </ComboboxList>
          </Combobox>
        </div>
      </template>
      <template #cell-actions="{ row }">
        <div class="flex gap-2">
          <Button variant="outline" size="sm" @click="handleEdit(row.original)">Edit</Button>
          <Button
            variant="outline"
            size="sm"
            class="text-destructive hover:bg-destructive/10"
            @click="handleDelete(row.original.id)"
          >
            Delete
          </Button>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type ColumnDef } from '@tanstack/vue-table'
import { useDataTable } from '@/composables/useDataTable'
import { getToursStore } from '@/stores/getToursStore'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TourFormModal from '@/components/tours/TourFormModal.vue'
import type { Tour, TourFilters } from '@/types/tour'
import { getDriversStore } from '@/stores/getDriversStore'
import { storeToRefs } from 'pinia'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxItemIndicator,
} from '@/components/ui/combobox'

const tourModalRef = ref<InstanceType<typeof TourFormModal> | null>(null)
const selectedTour = ref<Tour | null>(null)
const toursStore = getToursStore()
const { getTours } = storeToRefs(toursStore)
const driversStore = getDriversStore()
const { getDrivers } = storeToRefs(driversStore)

const filters = ref<TourFilters>({
  searchQuery: '',
  dateFilter: '',
})

const columns: ColumnDef<Tour>[] = [
  {
    accessorKey: 'customerName',
    header: 'Customer Name',
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
  },
  {
    id: 'actions',
    header: 'Actions',
  },
]

const { table } = useDataTable<Tour>({
  data: getTours.value,
  columns,
  filters: {
    searchQuery: filters.value.searchQuery,
    searchFields: ['locationFrom', 'locationTo', 'customerName'],
    dateField: 'shipmentDate',
    dateValue: filters.value.dateFilter,
  },
})

function handleEdit(tour: Tour) {
  selectedTour.value = tour
  if (tourModalRef.value) {
    tourModalRef.value.open = true
  }
}

function handleDelete(id: string) {
  toursStore.deleteTour(id)
}

function handleReset() {
  filters.value.searchQuery = ''
  filters.value.dateFilter = ''
}

function handleSearch() {
  // Filtering is handled by computed property
}

function handleDateFilter() {
  // Filtering is handled by computed property
}

function handleDriverAssign(tourId: string, driverId: string | null) {
  if (driverId) {
    toursStore.updateTour(tourId, { assignedDriverId: driverId })
  }
}

function handleModalClose() {
  selectedTour.value = null
}

const getDriverName = (driverId: string | null) => {
  if (!driverId) return 'Select driver...'
  const driver = getDrivers.value.find((d: { id: string }) => d.id === driverId)
  return driver?.name || 'Select driver...'
}

const getAvailableDrivers = (locationFrom: string) => {
  return getDrivers.value.filter(
    (driver: { location: string }) => driver.location.toLowerCase() === locationFrom.toLowerCase(),
  )
}
</script>
