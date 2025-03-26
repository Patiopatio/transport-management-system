<template>
  <section>
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 class="text-xl md:text-2xl font-bold">Tours</h1>
        <p class="text-sm md:text-base text-muted-foreground">
          Manage your shipment tours and assignments.
        </p>
      </div>
      <Button class="w-full sm:w-auto" @click="$emit('navigate')">Add Tour</Button>
    </div>

    <!-- Content -->
    <div class="rounded-lg border border-border">
      <div class="p-3 md:p-4">
        <p class="text-sm md:text-base text-muted-foreground">No tours found.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

defineEmits(['navigate'])
</script>
