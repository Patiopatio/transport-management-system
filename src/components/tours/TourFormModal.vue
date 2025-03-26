<template>
  <Dialog v-model:open="open">
    <DialogTrigger v-if="!selectedTour" as-child>
      <Button>Add Tour</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ selectedTour ? 'Edit Tour' : 'Create New Tour' }}</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="customerName">Customer Name</Label>
          <Input
            id="customerName"
            v-model="formData.customerName"
            placeholder="Enter customer name"
          />
        </div>

        <div class="space-y-2">
          <Label for="shipmentDate">Shipment Date</Label>
          <Input id="shipmentDate" v-model="formData.shipmentDate" type="date" />
        </div>

        <div class="space-y-2">
          <Label for="locationFrom">From Location</Label>
          <Input
            id="locationFrom"
            v-model="formData.locationFrom"
            placeholder="Enter starting location"
          />
        </div>

        <div class="space-y-2">
          <Label for="locationTo">To Location</Label>
          <Input
            id="locationTo"
            v-model="formData.locationTo"
            placeholder="Enter destination location"
          />
        </div>

        <div class="space-y-2">
          <Label for="driver">Assign Driver</Label>
          <Combobox v-model="selectedDriverId" class="w-full">
            <ComboboxAnchor class="w-full">
              <div class="relative w-full items-center">
                <ComboboxInput
                  class="w-full"
                  :display-value="() => selectedDriverName"
                  placeholder="Select driver..."
                />
                <ComboboxTrigger
                  class="absolute end-0 inset-y-0 flex items-center justify-center px-3"
                >
                  <ChevronsUpDown class="size-4 text-muted-foreground" />
                </ComboboxTrigger>
              </div>
            </ComboboxAnchor>
            <ComboboxList class="w-full">
              <ComboboxEmpty>No matching drivers</ComboboxEmpty>
              <ComboboxGroup>
                <ComboboxItem
                  v-for="driver in availableDrivers"
                  :key="driver.id"
                  :value="driver.id"
                  @select="handleDriverSelect(driver)"
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

        <div class="flex justify-end space-x-2">
          <Button type="button" variant="outline" @click="handleCancel">Cancel</Button>
          <Button type="submit">{{ selectedTour ? 'Update' : 'Create' }}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getToursStore } from '@/stores/getToursStore'
import { getDriversStore } from '@/stores/getDriversStore'
import { storeToRefs } from 'pinia'
import type { Tour, CreateTourInput } from '@/types/tour'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxTrigger,
  ComboboxList,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxItemIndicator,
} from '@/components/ui/combobox'

const props = defineProps<{
  selectedTour?: Tour | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const open = ref(false)
const getToursInstance = getToursStore()
const driversStore = getDriversStore()
const { getDrivers } = storeToRefs(driversStore)
const { allTours } = storeToRefs(getToursInstance)

const formData = reactive<CreateTourInput>({
  customerName: '',
  shipmentDate: '',
  locationFrom: '',
  locationTo: '',
  assignedDriverId: null,
})

const selectedDriverId = ref<string | null>(null)
const selectedDriverName = computed(() => {
  if (!selectedDriverId.value) return ''
  const driver = getDrivers.value.find(
    (d: { id: string; name: string }) => d.id === selectedDriverId.value,
  )
  return driver?.name || ''
})

const availableDrivers = computed(() => {
  if (!formData.locationFrom) return []
  return getDrivers.value.filter(
    (driver: { location: string }) => driver.location === formData.locationFrom,
  )
})

// Reset form when selectedTour changes
watch(
  () => props.selectedTour,
  (tour) => {
    if (tour) {
      formData.customerName = tour.customerName
      formData.shipmentDate = tour.shipmentDate
      formData.locationFrom = tour.locationFrom
      formData.locationTo = tour.locationTo
      formData.assignedDriverId = tour.assignedDriverId || null
      selectedDriverId.value = tour.assignedDriverId || null
      open.value = true
    }
  },
  { immediate: true },
)

const handleDriverSelect = (driver: { id: string }) => {
  formData.assignedDriverId = driver.id
}

const handleSubmit = () => {
  if (props.selectedTour) {
    getToursInstance.updateTour(props.selectedTour.id, formData)
  } else {
    const newTourId = `TR${String(allTours.value.length + 1).padStart(3, '0')}`
    getToursInstance.addTour({
      ...formData,
      id: newTourId,
    })
  }
  handleCancel()
}

const handleCancel = () => {
  formData.customerName = ''
  formData.shipmentDate = ''
  formData.locationFrom = ''
  formData.locationTo = ''
  formData.assignedDriverId = null
  selectedDriverId.value = null
  open.value = false
  emit('close')
}

defineExpose({
  open,
})
</script>
