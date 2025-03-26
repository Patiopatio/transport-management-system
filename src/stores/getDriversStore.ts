import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Driver } from '@/types/driver'

export const getDriversStore = defineStore('drivers', () => {
  const getDrivers = ref<Driver[]>([
    {
      id: 'DRV001',
      name: 'Alice Johnson',
      location: 'New York',
    },
    {
      id: 'DRV002',
      name: 'Hans Smidt',
      location: 'Frankfurt',
    },

    {
      id: 'DRV003',
      name: 'Tom Rolland',
      location: 'Berlin',
    },
  ])

  const createDriver = (driverData: Omit<Driver, 'id'>) => {
    const id = `DRV${String(getDrivers.value.length + 1).padStart(3, '0')}`
    const newDriver = {
      ...driverData,
      id,
    }
    getDrivers.value = [...getDrivers.value, newDriver]
  }

  const updateDriver = (id: string, driverData: Partial<Omit<Driver, 'id'>>) => {
    getDrivers.value = getDrivers.value.map((driver) =>
      driver.id === id ? { ...driver, ...driverData } : driver,
    )
  }

  const deleteDriver = (id: string) => {
    getDrivers.value = getDrivers.value.filter((driver) => driver.id !== id)
  }

  const getDriverById = (id: string) => {
    return getDrivers.value.find((driver) => driver.id === id)
  }

  const getDriversByLocation = (location: string) => {
    return getDrivers.value.filter((driver) => driver.location === location)
  }

  return {
    getDrivers,
    createDriver,
    updateDriver,
    deleteDriver,
    getDriverById,
    getDriversByLocation,
  }
})
