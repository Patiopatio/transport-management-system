<template>
  <div class="container mx-auto py-10">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Drivers</h1>
      <div class="flex gap-2">
        <DriverFormModal
          ref="driverModalRef"
          :selected-driver="selectedDriver"
          @close="handleModalClose"
        />
        <Button variant="outline" @click="handleReset">Reset Filters</Button>
      </div>
    </div>

    <div class="flex gap-4 mb-6">
      <Input
        v-model="searchQuery"
        placeholder="Search by name or location..."
        class="max-w-sm"
        @input="handleSearch"
      />
    </div>

    <DataTable :table="table">
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
import DataTable from '@/components/ui/data-table/DataTable.vue'
import DriverFormModal from '@/components/drivers/DriverFormModal.vue'
import { useVueTable, getCoreRowModel } from '@tanstack/vue-table'
import { getDriversStore } from '@/stores/getDriversStore'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Driver } from '@/types'

const searchQuery = ref('')
const driversStore = getDriversStore()
const { getDrivers } = storeToRefs(driversStore)
const driverModalRef = ref<InstanceType<typeof DriverFormModal> | null>(null)
const selectedDriver = ref<Driver | null>(null)

const filteredDrivers = computed(() => {
  let filtered = [...getDrivers.value]

  if (searchQuery.value) {
    filtered = filtered.filter(
      (driver) =>
        driver.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        driver.location.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  return filtered
})

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    id: 'actions',
    header: 'Actions',
  },
]

const handleDelete = (id: string) => {
  driversStore.deleteDriver(id)
}

const handleEdit = (driver: Driver) => {
  selectedDriver.value = driver
  if (driverModalRef.value) {
    driverModalRef.value.open = true
  }
}

const handleModalClose = () => {
  selectedDriver.value = null
}

const handleReset = () => {
  searchQuery.value = ''
}

const handleSearch = () => {
  // Filtering is handled by computed property
}

const table = useVueTable<Driver>({
  get data() {
    return filteredDrivers.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>
