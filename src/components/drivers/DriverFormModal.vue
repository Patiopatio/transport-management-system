<template>
  <Dialog v-model:open="open">
    <DialogTrigger v-if="!selectedDriver" as-child>
      <Button>Add Driver</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ selectedDriver ? 'Edit Driver' : 'Create New Driver' }}</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Driver Name</Label>
          <Input
            id="name"
            v-model="formData.name"
            placeholder="Enter driver name (min. 2 characters)"
            :class="{ 'border-destructive': errors.name }"
          />
          <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
        </div>

        <div class="space-y-2">
          <Label for="location">Location</Label>
          <Input
            id="location"
            v-model="formData.location"
            placeholder="Enter location (no numbers allowed)"
            :class="{ 'border-destructive': errors.location }"
          />
          <p v-if="errors.location" class="text-sm text-destructive">{{ errors.location }}</p>
        </div>

        <div class="flex justify-end space-x-2">
          <Button type="button" variant="outline" @click="handleCancel">Cancel</Button>
          <Button type="submit">{{ selectedDriver ? 'Update' : 'Create' }}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
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
import { getDriversStore } from '@/stores/getDriversStore'
import { driverSchema } from '@/validation/driver'
import type { Driver } from '@/types'
import { z } from 'zod'

const props = defineProps<{
  selectedDriver?: Driver | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const open = ref(false)
const driversStore = getDriversStore()

type CreateDriverInput = Omit<Driver, 'id'>

const formData = reactive<CreateDriverInput>({
  name: '',
  location: '',
})

const errors = reactive<{
  name?: string
  location?: string
}>({})

// Reset form when selectedDriver changes
watch(
  () => props.selectedDriver,
  (driver) => {
    if (driver) {
      formData.name = driver.name
      formData.location = driver.location
      open.value = true
    }
  },
  { immediate: true },
)

const validateForm = (): boolean => {
  try {
    driverSchema.parse(formData)
    errors.name = undefined
    errors.location = undefined
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0] === 'name') {
          errors.name = err.message
        }
        if (err.path[0] === 'location') {
          errors.location = err.message
        }
      })
    }
    return false
  }
}

const handleSubmit = () => {
  if (!validateForm()) return

  if (props.selectedDriver) {
    driversStore.updateDriver(props.selectedDriver.id, formData)
  } else {
    driversStore.createDriver(formData)
  }
  handleCancel()
}

const handleCancel = () => {
  formData.name = ''
  formData.location = ''
  errors.name = undefined
  errors.location = undefined
  open.value = false
  emit('close')
}

defineExpose({
  open,
})
</script>
