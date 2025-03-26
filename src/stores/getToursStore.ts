import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Tour } from '@/types/tour'

export const getToursStore = defineStore('tours', () => {
  // Initialize with example data
  const getTours = ref<Tour[]>([
    {
      id: 'TR001',
      customerName: 'Acme Corp',
      shipmentDate: '2025-03-20',
      locationFrom: 'New York',
      locationTo: 'Boston',
      assignedDriverId: 'DRV001',
    },
    {
      id: 'TR002',
      customerName: 'TechStart AG',
      shipmentDate: '2025-03-21',
      locationFrom: 'Berlin',
      locationTo: 'Frankfurt',
      assignedDriverId: 'DRV003',
    },
  ])

  const allTours = computed(() => getTours.value)
  const getTourById = (id: string) => getTours.value.find((tour) => tour.id === id)
  const getToursByDriver = (driverId: string) =>
    getTours.value.filter((tour) => tour.assignedDriverId === driverId)

  const addTour = (tour: Tour) => {
    getTours.value.push(tour)
  }

  const updateTour = (id: string, updates: Partial<Tour>) => {
    const index = getTours.value.findIndex((tour) => tour.id === id)
    if (index !== -1) {
      getTours.value[index] = { ...getTours.value[index], ...updates }
    }
  }

  const deleteTour = (id: string) => {
    getTours.value = getTours.value.filter((tour) => tour.id !== id)
  }

  return {
    getTours,
    allTours,
    getTourById,
    getToursByDriver,
    addTour,
    updateTour,
    deleteTour,
  }
})
